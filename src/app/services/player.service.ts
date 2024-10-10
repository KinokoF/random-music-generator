import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  forkJoin,
  from,
  interval,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { Sequencer, Synthetizer } from 'spessasynth_lib';
import { db } from '../db';
import { PlayerData } from '../models/player-data.model';
import { Song } from '../models/song.model';
import { Base64Service } from './base64.service';
import { StorageService } from './storage.service';
import { WakeService } from './wake.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private context = new AudioContext();
  private seq: Sequencer | undefined;
  private data$ = new BehaviorSubject<PlayerData | undefined>(undefined);

  constructor(
    private http: HttpClient,
    private base64Service: Base64Service,
    private wakeService: WakeService,
    private storageService: StorageService
  ) {}

  init(): void {
    const data = this.storageService.getPlayerData();

    forkJoin([
      data?.songId
        ? from(db.songs.get(data.songId)).pipe(
            switchMap((song) => this.base64Service.toBuffer(song!.base64))
          )
        : of(null),
      this.http.get('FluidR3Mono_GM.sf3', { responseType: 'arraybuffer' }),
      this.context.audioWorklet.addModule(
        new URL('worklet_processor.min.js', import.meta.url)
      ),
    ]).subscribe(([songBuffer, sfBuffer]) => {
      const synth = new Synthetizer(this.context.destination, sfBuffer);

      if (songBuffer) {
        this.seq = new Sequencer([{ binary: songBuffer }], synth);
        this.seq.loop = false;
        this.seq.currentTime = data!.current;
        this.seq.pause();
      } else {
        this.seq = new Sequencer([], synth);
        this.seq.loop = false;
      }

      this.emitNewSongData(data?.songId);
      interval(100).subscribe(() => this.emitSameSongData());
    });
  }

  load(song: Song): void {
    forkJoin([
      this.base64Service.toBuffer(song.base64),
      this.context.resume(),
    ]).subscribe(([buffer]) => {
      if (this.seq) {
        this.seq.loadNewSongList([{ binary: buffer }]);
        this.wakeService.on();
        this.emitNewSongData(song.id!);
      }
    });
  }

  unload(): void {
    if (this.seq) {
      this.seq.loadNewSongList([]);
      this.wakeService.off();
      this.emitNewSongData();
    }
  }

  playPause(): void {
    if (this.seq) {
      if (this.seq.paused) {
        this.context.resume().then(() => {
          this.seq!.play();
          this.wakeService.on();
          this.emitSameSongData();
        });
      } else {
        this.seq.pause();
        this.wakeService.off();
        this.emitSameSongData();
      }
    }
  }

  goTo(seconds: number): void {
    if (this.seq) {
      const paused = this.seq.paused;
      this.seq.currentTime = seconds;

      if (paused) {
        this.seq.pause();
      }

      this.emitSameSongData();
    }
  }

  getData$(): Observable<PlayerData | undefined> {
    return this.data$.asObservable();
  }

  getSongId(): number | undefined {
    return this.data$.getValue()?.songId;
  }

  isPaused(): boolean | undefined {
    return this.seq?.paused;
  }

  private emitSameSongData(): void {
    const songId = this.getSongId();
    this.emitNewSongData(songId);
  }

  private emitNewSongData(songId?: number): void {
    const data = {
      songId: songId,
      current: songId ? this.seq!.currentTime : 0,
      paused: this.seq!.paused,
      finished: this.seq!.isFinished,
    };

    this.data$.next(data);
    this.storageService.setPlayerData(data);
  }
}
