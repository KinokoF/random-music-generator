import { Config } from './config.model';

export interface Preset extends Config {
  id?: number;
  name: string;
  date?: number;
}
