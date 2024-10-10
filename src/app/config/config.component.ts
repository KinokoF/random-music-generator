import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigFormComponent } from '../config-form/config-form.component';
import { Config } from '../models/config.model';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [ConfigFormComponent],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss',
})
export class ConfigComponent {
  constructor(
    private storageService: StorageService,
    private snackBar: MatSnackBar
  ) {}

  save(config: Config): void {
    this.storageService.setConfig(config);
    this.snackBar.open('Config saved', 'Close', { duration: 10 * 1000 });
  }
}
