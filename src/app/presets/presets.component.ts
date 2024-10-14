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
import { db } from '../db';
import { Config } from '../models/config.model';
import { TimePipe } from '../pipes/time.pipe';
import { PresetNameDialogComponent } from '../preset-name-dialog/preset-name-dialog.component';
import { StorageService } from '../services/storage.service';

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
  styleUrl: './presets.component.scss',
})
export class PresetsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'date', 'actions'];
  dataSource = new MatTableDataSource<Config>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    liveQuery(() => db.configs.toArray()).subscribe(
      (configs) => (this.dataSource.data = configs)
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  rename(config: Config): void {
    this.dialog
      .open(PresetNameDialogComponent, { data: config.name })
      .afterClosed()
      .subscribe((name) => {
        if (name) {
          db.configs.update(config, { name });
        }
      });
  }

  use(config: Config): void {
    this.storageService.setConfig(config);
    this.snackBar.open('Config updated', 'Close');
  }

  export(config: Config): void {
    const woutId = { ...config, id: undefined };
    const json = JSON.stringify(woutId);
    const base64 = btoa(json);
    navigator.clipboard
      .writeText(base64)
      .then(() => this.snackBar.open('Copied to clipboard', 'Close'));
  }

  delete(config: Config): void {
    db.configs.delete(config.id!);
  }

  import(): void {
    const base64 = prompt('Enter the config string');

    if (base64) {
      const json = atob(base64);
      const config = JSON.parse(json);
      db.configs
        .add(config)
        .then(() => this.snackBar.open('Preset imported', 'Close'));
    }
  }

  deleteAll(): void {
    db.configs.clear().then(() => db.populate());
  }
}
