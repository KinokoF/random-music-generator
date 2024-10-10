import { Instrument } from "./instrument.model";
import { PerformedMeasure } from "./performed-measure.model";

export interface Track {
  instrument: Instrument;
  measures: PerformedMeasure[];
}
