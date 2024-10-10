import { Observable } from 'rxjs';
import { BpmEvent } from '../models/bpm-event.model';
import { Event } from '../models/event.model';
import { InstrumentEvent } from '../models/instrument-event.model';
import { NoteEvent } from '../models/note-event.model';
import { processChunks, splitIntoChunks } from './array-utils';

declare const JZZ: any;

export function convertToJzzSmf(events: Event[]): Observable<any> {
  const trk = new JZZ.MIDI.SMF.MTrk();

  const smf = new JZZ.MIDI.SMF(0, 10);
  smf.push(trk);

  const chunks = splitIntoChunks(events);

  return new Observable<any>((s) =>
    processChunks(
      chunks,
      (e) => {
        if ((e as InstrumentEvent).instrument) {
          const program = JZZ.MIDI.program(
            e.channel,
            (e as InstrumentEvent).instrument.midi
          );
          trk.add(e.startAt, program);
        } else if ((e as BpmEvent).bpm) {
          const smfBPM = JZZ.MIDI.smfBPM((e as BpmEvent).bpm);
          trk.add(e.startAt, smfBPM);
        } else {
          const noteOn = JZZ.MIDI.noteOn(e.channel, (e as NoteEvent).note, 127);
          const noteOff = JZZ.MIDI.noteOff(e.channel, (e as NoteEvent).note);
          trk
            .add(e.startAt, noteOn)
            .add(e.startAt + (e as NoteEvent).length, noteOff);
        }
      },
      () => s.next(smf)
    )
  );
}
