import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay, merge } from 'rxjs';
import { Scale } from 'tonal';
import { configs } from '../configs/configs';
import { defaultConfig } from '../configs/default-config';
import { Config } from '../models/config.model';
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
export class ConfigFormComponent {
  @Input() btnText = 'Generate';
  @Output() onSubmit = new EventEmitter<Config>();

  configs = configs;
  instruments = INSTRUMENTS;
  allTonics = TONICS;
  scales = Scale.names();
  arpeggios = CHORD_ARPEGGIO_TYPES;
  allArpeggioNoteLengths = calcArpeggioNoteLengths(defaultConfig);
  configForm;

  constructor(private snackBar: MatSnackBar, fb: FormBuilder) {
    this.configForm = fb.nonNullable.group({
      name: [defaultConfig.name, Validators.required],
      fgInstruments: fb.nonNullable.group({
        names: [defaultConfig.fgInstruments.names, Validators.required],
        poolSize: [defaultConfig.fgInstruments.poolSize, Validators.required],
        instrumentsPerPhraseMin: [
          defaultConfig.fgInstruments.instrumentsPerPhraseMin,
          Validators.required,
        ],
        instrumentsPerPhraseMax: [
          defaultConfig.fgInstruments.instrumentsPerPhraseMax,
          Validators.required,
        ],
      }),
      bgInstruments: fb.nonNullable.group({
        names: [defaultConfig.fgInstruments.names, Validators.required],
        poolSize: [defaultConfig.bgInstruments.poolSize, Validators.required],
        instrumentsPerPhraseMin: [
          defaultConfig.bgInstruments.instrumentsPerPhraseMin,
          Validators.required,
        ],
        instrumentsPerPhraseMax: [
          defaultConfig.bgInstruments.instrumentsPerPhraseMax,
          Validators.required,
        ],
      }),
      phrase: fb.nonNullable.group({
        poolSize: [defaultConfig.phrase.poolSize, Validators.required],
        bpmMin: [defaultConfig.phrase.bpmMin, Validators.required],
        bpmMax: [defaultConfig.phrase.bpmMax, Validators.required],
        tonics: [defaultConfig.phrase.tonics, Validators.required],
        scaleNames: [defaultConfig.phrase.scaleNames, Validators.required],
        measuresPerPhraseMin: [
          defaultConfig.phrase.measuresPerPhraseMin,
          Validators.required,
        ],
        measuresPerPhraseMax: [
          defaultConfig.phrase.measuresPerPhraseMax,
          Validators.required,
        ],
      }),
      melody: fb.nonNullable.group({
        noteOctaveMin: [
          defaultConfig.melody.noteOctaveMin,
          Validators.required,
        ],
        noteOctaveMax: [
          defaultConfig.melody.noteOctaveMax,
          Validators.required,
        ],
        dotsPerMeasure: [
          defaultConfig.melody.dotsPerMeasure,
          Validators.required,
        ],
        symbolsPerMeasureMin: [
          defaultConfig.melody.symbolsPerMeasureMin,
          Validators.required,
        ],
        symbolsPerMeasureMax: [
          defaultConfig.melody.symbolsPerMeasureMax,
          Validators.required,
        ],
        pauseProbability: [
          defaultConfig.melody.pauseProbability,
          Validators.required,
        ],
      }),
      chords: fb.nonNullable.group({
        noteOctaveMin: [
          defaultConfig.chords.noteOctaveMin,
          Validators.required,
        ],
        noteOctaveMax: [
          defaultConfig.chords.noteOctaveMax,
          Validators.required,
        ],
        dotsPerMeasure: [
          defaultConfig.chords.dotsPerMeasure,
          Validators.required,
        ],
        symbolsPerMeasureMin: [
          defaultConfig.chords.symbolsPerMeasureMin,
          Validators.required,
        ],
        symbolsPerMeasureMax: [
          defaultConfig.chords.symbolsPerMeasureMax,
          Validators.required,
        ],
        pauseProbability: [
          defaultConfig.chords.pauseProbability,
          Validators.required,
        ],
        arpeggioTypes: [
          defaultConfig.chords.arpeggioTypes,
          Validators.required,
        ],
        arpeggioNoteLengths: [
          defaultConfig.chords.arpeggioNoteLengths,
          Validators.required,
        ],
      }),
      structure: fb.nonNullable.group({
        rootChildsMin: [
          defaultConfig.structure.rootChildsMin,
          Validators.required,
        ],
        rootChildsMax: [
          defaultConfig.structure.rootChildsMax,
          Validators.required,
        ],
        nodeChildProbability: [
          defaultConfig.structure.nodeChildProbability,
          Validators.required,
        ],
        nodeLoopMin: [defaultConfig.structure.nodeLoopMin, Validators.required],
        nodeLoopMax: [defaultConfig.structure.nodeLoopMax, Validators.required],
        childsPerNodeMin: [
          defaultConfig.structure.childsPerNodeMin,
          Validators.required,
        ],
        childsPerNodeMax: [
          defaultConfig.structure.childsPerNodeMax,
          Validators.required,
        ],
        treeDepthMin: [
          defaultConfig.structure.treeDepthMin,
          Validators.required,
        ],
        treeDepthMax: [
          defaultConfig.structure.treeDepthMax,
          Validators.required,
        ],
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
    const config = this.configForm.value as Config;

    this.allArpeggioNoteLengths =
      config.melody.dotsPerMeasure &&
      config.chords.dotsPerMeasure &&
      config.melody.dotsPerMeasure % config.chords.dotsPerMeasure === 0
        ? calcArpeggioNoteLengths(config)
        : [];

    this.configForm
      .get('chords.arpeggioNoteLengths')!
      .setValue(this.allArpeggioNoteLengths);

    this.snackBar.open('Arpeggio note lengths updated', 'Close', {
      duration: 10 * 1000,
    });
  }

  applyConfig(config: Config): void {
    this.configForm.setValue(config, { emitEvent: false });
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
    this.onSubmit.emit(this.configForm.value as Config);
  }
}
