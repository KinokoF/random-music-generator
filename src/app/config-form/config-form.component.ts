import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faker } from '@faker-js/faker';
import { liveQuery } from 'dexie';
import { delay, merge } from 'rxjs';
import { Scale } from 'tonal';
import { db } from '../db';
import { Config } from '../models/config.model';
import { PresetNameDialogComponent } from '../preset-name-dialog/preset-name-dialog.component';
import { StorageService } from '../services/storage.service';
import { CHORD_ARPEGGIO_TYPES, INSTRUMENTS, TONICS } from '../utils/constants';
import { calcArpeggioNoteLengths } from '../utils/generator-utils';

@Component({
  selector: 'app-config-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    TitleCasePipe,
  ],
  templateUrl: './config-form.component.html',
  styleUrl: './config-form.component.scss',
})
export class ConfigFormComponent implements OnInit {
  @Input() btnText = 'Generate';
  @Output() onSubmit = new EventEmitter<Config>();

  configs: Config[] | undefined;
  instruments = INSTRUMENTS;
  allTonics = TONICS;
  scales = Scale.names();
  arpeggios = CHORD_ARPEGGIO_TYPES;
  allArpeggioNoteLengths: number[] | undefined;
  configForm: FormGroup | undefined;

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private storageService: StorageService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const config = this.storageService.getConfig();

    this.configs = [config];
    liveQuery(() => db.configs.toArray()).subscribe(
      (configs) => (this.configs = [config, ...configs])
    );

    this.allArpeggioNoteLengths = calcArpeggioNoteLengths(config);

    this.configForm = this.fb.nonNullable.group({
      name: [config.name, Validators.required],
      fgInstruments: this.fb.nonNullable.group({
        names: [config.fgInstruments.names, Validators.required],
        poolSize: [config.fgInstruments.poolSize, Validators.required],
        instrumentsPerPhraseMin: [
          config.fgInstruments.instrumentsPerPhraseMin,
          Validators.required,
        ],
        instrumentsPerPhraseMax: [
          config.fgInstruments.instrumentsPerPhraseMax,
          Validators.required,
        ],
      }),
      bgInstruments: this.fb.nonNullable.group({
        names: [config.fgInstruments.names, Validators.required],
        poolSize: [config.bgInstruments.poolSize, Validators.required],
        instrumentsPerPhraseMin: [
          config.bgInstruments.instrumentsPerPhraseMin,
          Validators.required,
        ],
        instrumentsPerPhraseMax: [
          config.bgInstruments.instrumentsPerPhraseMax,
          Validators.required,
        ],
      }),
      phrase: this.fb.nonNullable.group({
        poolSize: [config.phrase.poolSize, Validators.required],
        bpmMin: [config.phrase.bpmMin, Validators.required],
        bpmMax: [config.phrase.bpmMax, Validators.required],
        tonics: [config.phrase.tonics, Validators.required],
        scaleNames: [config.phrase.scaleNames, Validators.required],
        measuresPerPhraseMin: [
          config.phrase.measuresPerPhraseMin,
          Validators.required,
        ],
        measuresPerPhraseMax: [
          config.phrase.measuresPerPhraseMax,
          Validators.required,
        ],
      }),
      melody: this.fb.nonNullable.group({
        noteOctaveMin: [config.melody.noteOctaveMin, Validators.required],
        noteOctaveMax: [config.melody.noteOctaveMax, Validators.required],
        dotsPerMeasure: [config.melody.dotsPerMeasure, Validators.required],
        symbolsPerMeasureMin: [
          config.melody.symbolsPerMeasureMin,
          Validators.required,
        ],
        symbolsPerMeasureMax: [
          config.melody.symbolsPerMeasureMax,
          Validators.required,
        ],
        pauseProbability: [config.melody.pauseProbability, Validators.required],
      }),
      chords: this.fb.nonNullable.group({
        noteOctaveMin: [config.chords.noteOctaveMin, Validators.required],
        noteOctaveMax: [config.chords.noteOctaveMax, Validators.required],
        dotsPerMeasure: [config.chords.dotsPerMeasure, Validators.required],
        symbolsPerMeasureMin: [
          config.chords.symbolsPerMeasureMin,
          Validators.required,
        ],
        symbolsPerMeasureMax: [
          config.chords.symbolsPerMeasureMax,
          Validators.required,
        ],
        pauseProbability: [config.chords.pauseProbability, Validators.required],
        arpeggioTypes: [config.chords.arpeggioTypes, Validators.required],
        arpeggioNoteLengths: [
          config.chords.arpeggioNoteLengths,
          Validators.required,
        ],
      }),
      structure: this.fb.nonNullable.group({
        rootChildsMin: [config.structure.rootChildsMin, Validators.required],
        rootChildsMax: [config.structure.rootChildsMax, Validators.required],
        nodeChildProbability: [
          config.structure.nodeChildProbability,
          Validators.required,
        ],
        nodeLoopMin: [config.structure.nodeLoopMin, Validators.required],
        nodeLoopMax: [config.structure.nodeLoopMax, Validators.required],
        childsPerNodeMin: [
          config.structure.childsPerNodeMin,
          Validators.required,
        ],
        childsPerNodeMax: [
          config.structure.childsPerNodeMax,
          Validators.required,
        ],
        treeDepthMin: [config.structure.treeDepthMin, Validators.required],
        treeDepthMax: [config.structure.treeDepthMax, Validators.required],
      }),
    });

    merge(
      this.configForm.get('melody.dotsPerMeasure')!.valueChanges,
      this.configForm.get('chords.dotsPerMeasure')!.valueChanges
    )
      .pipe(delay(0))
      .subscribe(() => this.updateArpeggioNoteLenghts());
  }

  private updateArpeggioNoteLenghts(): void {
    const config = this.configForm!.value as Config;

    this.allArpeggioNoteLengths =
      config.melody.dotsPerMeasure &&
      config.chords.dotsPerMeasure &&
      config.melody.dotsPerMeasure % config.chords.dotsPerMeasure === 0
        ? calcArpeggioNoteLengths(config)
        : [];

    this.configForm!.get('chords.arpeggioNoteLengths')!.setValue(
      this.allArpeggioNoteLengths
    );

    this.snackBar.open('Arpeggio note lengths updated', 'Close', {
      duration: 10 * 1000,
    });
  }

  applyConfig(config: Config): void {
    this.configForm?.setValue(config, { emitEvent: false });
  }

  printValues(obj: any): string {
    return Object.values(obj)
      .filter((v) => !Array.isArray(v))
      .map((v) => v ?? '_')
      .join(', ');
  }

  renderSelectAll(select: MatSelect, opened: boolean): void {
    const selectAll = select.options.find((o) => o.value === '*')!;
    const options = select.options.filter((o) => o.value !== '*');

    const allSelected = options.every((o) => o.selected);

    opened && allSelected ? selectAll.select() : selectAll.deselect();
  }

  selectAll(select: MatSelect): void {
    const selectAll = select.options.find((o) => o.value === '*')!;
    const options = select.options.filter((o) => o.value !== '*');

    const allSelected = options.every((o) => o.selected);

    options.forEach((o) => (allSelected ? o.deselect() : o.select()));
    allSelected ? selectAll.deselect() : selectAll.select();
  }

  submit(): void {
    this.onSubmit.emit(this.configForm!.value as Config);
  }

  addToPresets(): void {
    const defaultName = `${faker.word.adjective()} preset`;
    this.dialog
      .open(PresetNameDialogComponent, { data: defaultName })
      .afterClosed()
      .subscribe((name) => {
        if (name) {
          const config = {
            ...this.configForm!.value,
            name,
            date: Date.now(),
          };
          db.configs.add(config);
        }
      });
  }
}
