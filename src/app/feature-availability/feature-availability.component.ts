import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Availability } from '../models/feature.model';

@Component({
  selector: 'app-feature-availability',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './feature-availability.component.html',
  styleUrl: './feature-availability.component.scss'
})
export class FeatureAvailabilityComponent {
  @Input() value: Availability | undefined;
}
