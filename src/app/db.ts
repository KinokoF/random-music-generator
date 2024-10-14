import Dexie, { Table } from 'dexie';
import { PRESETS } from './default-presets/presets';
import { Preset } from './models/preset.model';
import { Song } from './models/song.model';

export class AppDB extends Dexie {
  songs!: Table<Song, number>;
  presets!: Table<Preset, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(6).stores({
      songs: '++id',
      presets: '++id',
    });
    this.on('populate', () => this.populate());
  }

  async populate(): Promise<void> {
    await db.presets.bulkAdd(PRESETS);
  }
}

export const db = new AppDB();
