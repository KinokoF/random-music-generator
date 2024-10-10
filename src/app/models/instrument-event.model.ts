import { Event } from "./event.model";
import { Instrument } from "./instrument.model";

export interface InstrumentEvent extends Event {
  instrument: Instrument;
}
