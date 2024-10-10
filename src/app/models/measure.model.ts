import { ChordAndCell } from "./chord-and-cell.model";
import { NoteAndCell } from "./note-and-cell.model";

export interface Measure {
  notes: NoteAndCell[];
  chords: ChordAndCell[];
}
