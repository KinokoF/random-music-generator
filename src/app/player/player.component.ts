import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { liveQuery } from 'dexie';
import { combineLatest, switchMap } from 'rxjs';
import { db } from '../db';
import { PlayerData } from '../models/player-data.model';
import { Song } from '../models/song.model';
import { TimePipe } from '../pipes/time.pipe';
import { RenameDialogComponent } from '../rename-dialog/rename-dialog.component';
import { GeneratorService } from '../services/generator.service';
import { LoadingService } from '../services/loading.service';
import { PlayerService } from '../services/player.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    TimePipe,
    MatTooltipModule,
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent implements OnInit {
  song: Song | undefined;
  playerData: PlayerData | undefined;

  constructor(
    private playerService: PlayerService,
    private dialog: MatDialog,
    private storageService: StorageService,
    private generatorService: GeneratorService,
    private loading: LoadingService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    combineLatest([
      liveQuery(() => db.songs.toArray()),
      this.playerService.getData$(),
    ]).subscribe(([songs, playerData]) => {
      this.song = songs.find((s) => s.id === playerData?.songId);
      this.playerData = playerData;
    });
  }

  likeUnlike(): void {
    db.songs.update(this.song!, { like: !this.song!.like });
  }

  goTo(seconds: number): void {
    this.playerService.goTo(seconds);
  }

  playPause(): void {
    this.playerService.playPause();
  }

  generate(): void {
    this.loading.show('Generating...');

    const config = this.storageService.getConfig();
    this.generatorService
      .generate(config)
      .pipe(
        switchMap((song) => db.songs.add(song)),
        switchMap((id) => db.songs.get(id))
      )
      .subscribe({
        next: (song) => {
          this.playerService.load(song!);
          this.loading.hide();
        },
        error: (error) => {
          this.loading.hide();
          this.snackBar.open(error.message, 'Close');
        },
      });
  }

  getEndlessMode(): boolean {
    return this.storageService.getEndlessMode();
  }

  toggleEndlessMode(): void {
    const value = !this.storageService.getEndlessMode();
    this.storageService.setEndlessMode(value);
  }

  rename(): void {
    this.dialog
      .open(RenameDialogComponent, { data: this.song!.title })
      .afterClosed()
      .subscribe((title) => {
        if (title) {
          db.songs.update(this.song!, { title });
        }
      });
  }
}
