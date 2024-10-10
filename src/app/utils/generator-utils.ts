import { Chord } from '@tonaljs/chord';
import { Note } from '@tonaljs/pitch-note';
import random from 'random';
import {
  ChordType,
  Chord as ChordUtils,
  Note as NoteUtils,
  Scale,
} from 'tonal';
import { Cell } from '../models/cell.model';
import { ChordAndCell } from '../models/chord-and-cell.model';
import { Config } from '../models/config.model';
import { Event } from '../models/event.model';
import { Instrument } from '../models/instrument.model';
import { Measure } from '../models/measure.model';
import { Child, Node } from '../models/node.model';
import { NoteAndCell } from '../models/note-and-cell.model';
import { Performance } from '../models/performance.model';
import { Phrase } from '../models/phrase.model';
import { array } from './array-utils';
import { INSTRUMENTS, MIDI_NOTE_MAX, MIDI_NOTE_MIN, TONICS } from './constants';

export function getAllNotes(): Note[] {
  return array(MIDI_NOTE_MAX - MIDI_NOTE_MIN)
    .map((_, i) => i + MIDI_NOTE_MIN)
    .map(NoteUtils.fromMidi)
    .map(NoteUtils.get);
}

export function getAllChords(): Chord[] {
  return TONICS.flatMap((t) =>
    ChordType.symbols().map((s) => ChordUtils.getChord(s, t.name))
  );
}

function chooseFgInstruments(config: Config): Instrument[] {
  const fgInstruments = INSTRUMENTS.filter((i) =>
    config.fgInstruments.names.includes(i.name)
  );

  return array(config.fgInstruments.poolSize).map(
    () => random.choice(fgInstruments)!
  );
}

function chooseBgInstruments(config: Config): Instrument[] {
  const bgInstruments = INSTRUMENTS.filter((i) =>
    config.bgInstruments.names.includes(i.name)
  );

  return array(config.bgInstruments.poolSize).map(
    () => random.choice(bgInstruments)!
  );
}

function generateCells(symbolsNum: number, dotsPerMeasure: number): Cell[] {
  const lengths = array(symbolsNum)
    .map((_, i) => i)
    .concat(
      array(dotsPerMeasure - symbolsNum).map(() =>
        random.int(0, symbolsNum - 1)
      )
    )
    .reduce((a, c) => ((a[c] += 1), a), Array(symbolsNum).fill(0));

  const cells = [];
  let startAt = 0;

  for (let i = 0; i < lengths.length; i++) {
    const length = lengths[i];

    cells.push({ startAt, length });

    startAt += length;
  }

  return cells;
}

function generateMelodySymbol(
  config: Config,
  notes: Note[],
  cell: Cell
): NoteAndCell | undefined {
  const melodyNotes = notes.filter((n) =>
    [config.melody.noteOctaveMin, config.melody.noteOctaveMax].includes(n.oct!)
  );

  return random.float() > config.melody.pauseProbability
    ? { note: random.choice(melodyNotes)!, cell }
    : undefined;
}

function generateChordSymbol(
  config: Config,
  chords: Chord[],
  cell: Cell
): ChordAndCell | undefined {
  return random.float() > config.chords.pauseProbability
    ? {
        chord: random.choice(chords)!,
        cell,
      }
    : undefined;
}

function generateMeasure(
  config: Config,
  notes: Note[],
  chords: Chord[]
): Measure {
  const melodySymbolsNum = random.int(
    config.melody.symbolsPerMeasureMin,
    config.melody.symbolsPerMeasureMax
  );
  const melodyCells = generateCells(
    melodySymbolsNum,
    config.melody.dotsPerMeasure
  );

  const chordSymbolsNum = random.int(
    config.chords.symbolsPerMeasureMin,
    config.chords.symbolsPerMeasureMax
  );
  const chordCells = generateCells(
    chordSymbolsNum,
    config.chords.dotsPerMeasure
  );

  return {
    notes: melodyCells
      .map((c) => generateMelodySymbol(config, notes, c))
      .filter((s) => s !== undefined),
    chords: chordCells
      .map((c) => generateChordSymbol(config, chords, c))
      .filter((s) => s !== undefined),
  };
}

function generatePhrase(
  config: Config,
  allNotes: Note[],
  allChords: Chord[]
): Phrase {
  let scale;

  // Workaround perché 2 scale non hanno note
  do {
    const name = random.choice(config.phrase.scaleNames)!;
    scale = Scale.get(`C ${name}`);
  } while (!scale.notes.length);

  const chromas = scale.notes.map(NoteUtils.chroma);
  const notes = allNotes.filter((n) => chromas.includes(n.chroma));
  const chords = allChords.filter((c) =>
    c.notes.map(NoteUtils.chroma).every((c) => chromas.includes(c))
  );
  const measuresNum = random.int(
    config.phrase.measuresPerPhraseMin,
    config.phrase.measuresPerPhraseMax
  );

  return {
    bpm: random.int(config.phrase.bpmMin, config.phrase.bpmMax),
    measures: array(measuresNum).map(() =>
      generateMeasure(config, notes, chords)
    ),
  };
}

function generatePhrases(
  config: Config,
  allNotes: Note[],
  allChords: Chord[]
): Phrase[] {
  return array(config.phrase.poolSize).map(() =>
    generatePhrase(config, allNotes, allChords)
  );
}

function getChordSequenceNotes(
  chordNotes: string[],
  mode: 'SEQ_ASC' | 'SEQ_DESC' | 'ARP_ASC' | 'ARP_DESC' | 'RND'
): string[] {
  switch (mode) {
    case 'SEQ_ASC':
      return NoteUtils.sortedNames(chordNotes, NoteUtils.ascending);
    case 'SEQ_DESC':
      return NoteUtils.sortedNames(chordNotes, NoteUtils.descending);
    case 'ARP_ASC':
      const a = NoteUtils.sortedNames(chordNotes, NoteUtils.ascending);
      return a.concat(a.slice(1, -1).reverse());
    case 'ARP_DESC':
      const b = NoteUtils.sortedNames(chordNotes, NoteUtils.descending);
      return b.concat(b.slice(1, -1).reverse());
    case 'RND':
      return chordNotes
        .map((n) => ({ n, sort: random.float() }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.n);
  }
}

function chordToNotes(
  config: Config,
  chordAndCell: ChordAndCell,
  mode: 'FULL' | 'SEQ_ASC' | 'SEQ_DESC' | 'ARP_ASC' | 'ARP_DESC' | 'RND',
  noteLength: number
): NoteAndCell[] {
  const ratioDots = config.melody.dotsPerMeasure / config.chords.dotsPerMeasure;

  const scaledStartAt = chordAndCell.cell.startAt * ratioDots;
  const scaledLength = chordAndCell.cell.length * ratioDots;

  const chordNotes = chordAndCell.chord.notes.map(
    (n) =>
      n + random.int(config.chords.noteOctaveMin, config.chords.noteOctaveMax)
  );

  if (mode === 'FULL') {
    return chordNotes.map(NoteUtils.get).map((note) => ({
      note,
      cell: { startAt: scaledStartAt, length: scaledLength },
    }));
  } else {
    const sortedNotes = getChordSequenceNotes(chordNotes, mode);

    const notesToPlay = array(scaledLength / noteLength).map(
      (_, i) => sortedNotes[i % sortedNotes.length]
    );
    return notesToPlay.map((note, i) => ({
      note: NoteUtils.get(note),
      cell: { startAt: scaledStartAt + i * noteLength, length: noteLength },
    }));
  }
}

function transposePhrase(config: Config, phrase: Phrase): Phrase {
  const tonic = random.choice(config.phrase.tonics)!;
  const interval = TONICS.find((t) => t.name === tonic)!.distanceFromC;

  return {
    bpm: phrase.bpm,
    measures: phrase.measures.map((m) => ({
      notes: m.notes.map((n) => ({
        note: NoteUtils.get(NoteUtils.transpose(n.note.name, interval)),
        cell: n.cell,
      })),
      chords: m.chords.map((c) => ({
        chord: ChordUtils.get(ChordUtils.transpose(c.chord.name, interval)),
        cell: c.cell,
      })),
    })),
  };
}

export function calcArpeggioNoteLengths(config: Config): number[] {
  const ratioDots = config.melody.dotsPerMeasure / config.chords.dotsPerMeasure;
  return array(ratioDots)
    .map((_, i) => i + 1)
    .filter((i) => ratioDots % i === 0);
}

function generateTree(
  config: Config,
  fgInstruments: Instrument[],
  bgInstruments: Instrument[],
  phrases: Phrase[]
) {
  const rootChildsNum = random.int(
    config.structure.rootChildsMin,
    config.structure.rootChildsMax
  );
  const depthMax = random.int(
    config.structure.treeDepthMin,
    config.structure.treeDepthMax
  );

  const generateNode = (depth: number): Node => {
    const childsNum = random.int(
      config.structure.childsPerNodeMin,
      config.structure.childsPerNodeMax
    );

    return {
      loop: random.int(
        config.structure.nodeLoopMin,
        config.structure.nodeLoopMax
      ),
      childs: array(childsNum).map(() => generateChild(depth)),
    };
  };

  const generatePerformance = (): Performance => {
    const phrase = random.choice(phrases)!;
    const transposedPhrase = transposePhrase(config, phrase);

    const fgTrackNum = random.int(
      config.fgInstruments.instrumentsPerPhraseMin,
      config.fgInstruments.instrumentsPerPhraseMax
    );
    const fgTracks = array(fgTrackNum)
      .map(() => random.choice(fgInstruments)!)
      .map((instrument) => ({
        instrument,
        measures: transposedPhrase.measures,
      }));

    const bgTracksNum = random.int(
      config.bgInstruments.instrumentsPerPhraseMin,
      config.bgInstruments.instrumentsPerPhraseMax
    );
    const bgTracks = array(bgTracksNum)
      .map(() => random.choice(bgInstruments)!)
      .map((instrument) => {
        const seqMode = random.choice(config.chords.arpeggioTypes)!;
        const seqNoteLength = random.choice(config.chords.arpeggioNoteLengths)!;

        const measures = transposedPhrase.measures.map((measure) => {
          const notes = measure.chords.flatMap((chord) =>
            chordToNotes(config, chord, seqMode as any, seqNoteLength)
          );

          return { notes };
        });

        return { instrument, measures };
      });

    return {
      phrase: transposedPhrase,
      tracks: fgTracks.concat(bgTracks as any[]),
    };
  };

  const generateChild = (depth: number): Child => {
    return depth < depthMax &&
      random.float() < config.structure.nodeChildProbability
      ? generateNode(depth + 1)
      : generatePerformance();
  };

  return array(rootChildsNum).map(() => generateChild(1));
}

function flattenTree(config: Config, rootChilds: Child[]): Event[] {
  const events: Event[] = [];
  let cursor = 0;

  const traverse = (childs: Child[]): void =>
    childs.forEach((child) => {
      if ((child as Node).childs) {
        array((child as Node).loop).forEach(() =>
          traverse((child as Node).childs)
        );
      } else {
        const event = {
          channel: 0,
          bpm: (child as Performance).phrase.bpm,
          startAt: cursor,
        };
        events.push(event);

        (child as Performance).tracks.forEach((t, i) => {
          const event = {
            channel: i,
            instrument: t.instrument,
            startAt: cursor,
          };
          events.push(event);

          let trackCursor = cursor;
          t.measures.forEach((m) => {
            m.notes.forEach((n) => {
              const event = {
                channel: i,
                note: n.note.midi,
                startAt: trackCursor + n.cell.startAt,
                length: n.cell.length,
              };
              events.push(event);
            });

            trackCursor += config.melody.dotsPerMeasure;
          });
        });

        cursor +=
          (child as Performance).phrase.measures.length *
          config.melody.dotsPerMeasure;
      }
    });

  traverse(rootChilds);

  return events;
}

export function generate(
  config: Config,
  allNotes: Note[],
  allChords: Chord[]
): Event[] {
  const fgInstruments = chooseFgInstruments(config);
  const bgInstruments = chooseBgInstruments(config);
  const phrases = generatePhrases(config, allNotes, allChords);
  const tree = generateTree(config, fgInstruments, bgInstruments, phrases);
  return flattenTree(config, tree);
}
