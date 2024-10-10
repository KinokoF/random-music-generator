import { Config } from './config.model';

export interface Song {
  id?: number;
  title: string;
  duration: number;
  like: boolean;
  genConfig: Config;
  genDate: number;
  base64: string;
}
