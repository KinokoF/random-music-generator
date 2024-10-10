import Dexie, { Table } from 'dexie';
import { Song } from './models/song.model';

export class AppDB extends Dexie {
  songs!: Table<Song, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(4).stores({
      songs: '++id',
    });
  }
}

export const db = new AppDB();
