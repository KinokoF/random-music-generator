import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { liveQuery } from 'dexie';
import { switchMap } from 'rxjs';
import { db } from '../db';
import { Song } from '../models/song.model';
import { TimePipe } from '../pipes/time.pipe';
import { RenameDialogComponent } from '../rename-dialog/rename-dialog.component';
import { Base64Service } from '../services/base64.service';
import { LoadingService } from '../services/loading.service';
import { PlayerService } from '../services/player.service';
import { RenderService } from '../services/render.service';
import { download } from '../utils/download-utils';

@Component({
  selector: 'app-presets',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    DatePipe,
    MatIconModule,
    TimePipe,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
  ],
  templateUrl: './presets.component.html',
  styleUrl: './presets.component.scss'
})
export class PresetsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'title',
    'duration',
    'like',
    'genDate',
    'actions',
  ];
  dataSource = new MatTableDataSource<Song>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private loading: LoadingService,
    private renderService: RenderService,
    private snackBar: MatSnackBar,
    private base64Service: Base64Service,
    private dialog: MatDialog,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    liveQuery(() => db.songs.toArray()).subscribe(
      (songs) => (this.dataSource.data = songs.reverse())
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isLoaded(song: Song): boolean {
    return this.playerService.getSongId() === song.id;
  }

  isPaused(): boolean {
    const paused = this.playerService.isPaused();
    return paused !== undefined ? paused : true;
  }

  playPause(): void {
    this.playerService.playPause();
  }

  loadOrPlayPause(song: Song): void {
    if (this.isLoaded(song)) {
      this.playerService.playPause();
    } else {
      this.playerService.load(song);
    }
  }

  likeUnlike(song: Song): void {
    db.songs.update(song, { like: !song.like });
  }

  rename(song: Song): void {
    this.dialog
      .open(RenameDialogComponent, { data: song.title })
      .afterClosed()
      .subscribe((title) => {
        if (title) {
          db.songs.update(song, { title });
        }
      });
  }

  downloadMidi(song: Song): void {
    download(song.base64, `${song.title}.mid`);
  }

  downloadWav(song: Song): void {
    this.loading.show('Rendering...');

    this.base64Service
      .toBuffer(song.base64)
      .pipe(switchMap((buffer) => this.renderService.render(buffer)))
      .subscribe({
        next: (base64) => {
          download(base64, `${song.title}.wav`);
          this.loading.hide();
        },
        error: (error) => {
          this.loading.hide();
          this.snackBar.open(error.message, 'Close', { duration: 10 * 1000 });
        },
      });
  }

  delete(song: Song): void {
    if (this.isLoaded(song)) {
      this.playerService.unload();
    }

    db.songs.delete(song.id!);
  }

  deleteAll(): void {
    this.playerService.unload();
    db.songs.clear();
  }
}
