import { Event } from "./event.model";

export interface BpmEvent extends Event {
  bpm: number;
}
