import { Phrase } from "./phrase.model";
import { Track } from "./track.model";

export interface Performance {
  phrase: Phrase;
  tracks: Track[]
}
