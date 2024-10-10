import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Chord } from '@tonaljs/chord';
import { Note } from '@tonaljs/pitch-note';
import { EMPTY, map, Observable, switchMap } from 'rxjs';
import { MIDI } from 'spessasynth_lib';
import { Config } from '../models/config.model';
import { Event } from '../models/event.model';
import { Song } from '../models/song.model';
import { getAllChords, getAllNotes } from '../utils/generator-utils';
import { convertToJzzSmf } from '../utils/jzz-smf-utils';
import { Base64Service } from './base64.service';

@Injectable({
  providedIn: 'root',
})
export class GeneratorService {
  private allNotes: Note[] | undefined;
  private allChords: Chord[] | undefined;
  private worker: Worker | undefined;

  constructor(private base64Service: Base64Service) {}

  init() {
    this.allNotes = getAllNotes();
    this.allChords = getAllChords();
    this.worker = new Worker(
      new URL('../workers/generator.worker', import.meta.url)
    );
  }

  generate(config: Config): Observable<Song> {
    return this.worker
      ? new Observable<Event[]>((s) => {
          this.worker!.onmessage = (e) => s.next(e.data);
          this.worker!.postMessage([config, this.allNotes, this.allChords]);
        }).pipe(
          switchMap(convertToJzzSmf),
          map((jzzSmf) => jzzSmf.toArrayBuffer()),
          switchMap((buffer) =>
            this.base64Service
              .fromBuffer(buffer)
              .pipe(map((base64) => [buffer, base64]))
          ),
          map(([buffer, base64]) => ({
            title: faker.music.songName(),
            duration: new MIDI(buffer).duration,
            like: false,
            genConfig: config,
            genDate: Date.now(),
            base64,
          }))
        )
      : EMPTY;
  }
}
