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
import { Preset } from '../models/preset.model';
import { TimePipe } from '../pipes/time.pipe';
import { PromptDialogComponent } from '../prompt-dialog/prompt-dialog.component';
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
  dataSource = new MatTableDataSource<Preset>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    liveQuery(() => db.presets.toArray()).subscribe(
      (presets) => (this.dataSource.data = presets)
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  rename(preset: Preset): void {
    this.dialog
      .open(PromptDialogComponent, {
        data: {
          title: 'Rename',
          fieldLabel: 'Name',
          fieldValue: preset.name,
          btnText: 'Save',
        },
      })
      .afterClosed()
      .subscribe((name) => {
        if (name) {
          db.presets.update(preset, { name });
        }
      });
  }

  use(preset: Preset): void {
    const config = {
      ...preset,
      id: undefined,
      name: undefined,
      date: undefined,
    };
    this.storageService.setConfig(config);
    this.snackBar.open('Config updated', 'Close');
  }

  export(preset: Preset): void {
    const woutId = { ...preset, id: undefined };
    const json = JSON.stringify(woutId);
    const base64 = btoa(json);
    navigator.clipboard
      .writeText(base64)
      .then(() => this.snackBar.open('Copied to clipboard', 'Close'));
  }

  delete(preset: Preset): void {
    db.presets.delete(preset.id!);
  }

  import(): void {
    this.dialog
      .open(PromptDialogComponent, {
        data: {
          title: 'Enter the preset string',
          fieldLabel: 'Preset string',
          btnText: 'Import',
        },
      })
      .afterClosed()
      .subscribe((base64) => {
        if (base64) {
          const json = atob(base64);
          const preset = JSON.parse(json);
          db.presets
            .add(preset)
            .then(() => this.snackBar.open('Preset imported', 'Close'));
        }
      });
  }

  deleteAll(): void {
    db.presets.clear().then(() => db.populate());
  }
}
