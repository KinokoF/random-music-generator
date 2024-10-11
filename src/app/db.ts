import Dexie, { Table } from 'dexie';
import { configs } from './configs/configs';
import { Config } from './models/config.model';
import { Song } from './models/song.model';

export class AppDB extends Dexie {
  songs!: Table<Song, number>;
  configs!: Table<Config, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(5).stores({
      songs: '++id',
      configs: '++id',
    });
    this.on('populate', () => this.populate());
  }

  async populate(): Promise<void> {
    await db.configs.bulkAdd(configs);
  }
}

export const db = new AppDB();
