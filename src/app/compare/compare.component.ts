import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FeatureAvailabilityComponent } from '../feature-availability/feature-availability.component';
import { FEATURES } from '../utils/constants';

@Component({
  selector: 'app-compare',
  standalone: true,
  imports: [MatTableModule, FeatureAvailabilityComponent],
  templateUrl: './compare.component.html',
  styleUrl: './compare.component.scss',
})
export class CompareComponent {
  displayedColumns: string[] = ['name', 'rmg', 'udio', 'spotify'];
  dataSource = FEATURES;
}
