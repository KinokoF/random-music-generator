import { Event } from "./event.model";

export interface NoteEvent extends Event {
  note: number;
  length: number;
}
