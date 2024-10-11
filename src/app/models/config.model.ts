interface InstrumentsConfig {
  names: string[];
  poolSize: number;
  instrumentsPerPhraseMin: number;
  instrumentsPerPhraseMax: number;
}

interface PhraseConfig {
  poolSize: number;
  bpmMin: number;
  bpmMax: number;
  tonics: string[];
  scaleNames: string[];
  measuresPerPhraseMin: number;
  measuresPerPhraseMax: number;
}

interface MelodyConfig {
  noteOctaveMin: number;
  noteOctaveMax: number;
  dotsPerMeasure: number;
  symbolsPerMeasureMin: number;
  symbolsPerMeasureMax: number;
  pauseProbability: number;
}

interface ChordsConfig {
  noteOctaveMin: number;
  noteOctaveMax: number;
  dotsPerMeasure: number;
  symbolsPerMeasureMin: number;
  symbolsPerMeasureMax: number;
  pauseProbability: number;
  arpeggioTypes: string[];
  arpeggioNoteLengths: number[];
}

interface StructureConfig {
  rootChildsMin: number;
  rootChildsMax: number;
  nodeChildProbability: number;
  nodeLoopMin: number;
  nodeLoopMax: number;
  childsPerNodeMin: number;
  childsPerNodeMax: number;
  treeDepthMin: number;
  treeDepthMax: number;
}

export interface Config {
  name: string;
  date?: string;
  fgInstruments: InstrumentsConfig;
  bgInstruments: InstrumentsConfig;
  phrase: PhraseConfig;
  melody: MelodyConfig;
  chords: ChordsConfig;
  structure: StructureConfig;
}
