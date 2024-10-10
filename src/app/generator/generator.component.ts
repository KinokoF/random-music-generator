import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConfigFormComponent } from '../config-form/config-form.component';
import { db } from '../db';
import { Config } from '../models/config.model';
import { GeneratorService } from '../services/generator.service';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [
    MatButtonModule,
    MatProgressSpinnerModule,
    ConfigFormComponent,
    FormsModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.scss',
})
export class GeneratorComponent {
  step: 'CONFIG' | 'LOADING' | 'DONE' = 'CONFIG';

  constructor(
    private playerService: PlayerService,
    private generatorService: GeneratorService,
    private snackBar: MatSnackBar
  ) {}

  generate(config: Config): void {
    this.step = 'LOADING';

    this.generatorService
      .generate(config)
      .pipe(
        switchMap((song) => db.songs.add(song)),
        switchMap((id) => db.songs.get(id))
      )
      .subscribe({
        next: (song) => {
          this.playerService.load(song!);
          this.step = 'DONE';
        },
        error: (error) => {
          this.step = 'CONFIG';
          this.snackBar.open(error.message, 'Close', { duration: 10 * 1000 });
        },
      });
  }

  back(): void {
    this.step = 'CONFIG';
  }
}
