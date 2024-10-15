import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

type Availability = 'YES' | 'PARTIAL' | 'NO' | string;

interface Feature {
  name: string;
  rmg: Availability;
  udio: Availability;
  spotify: Availability;
}

const ELEMENT_DATA: Feature[] = [
  {name: 'No login required', rmg: 'YES', udio: 'PARTIAL', spotify: 'NO'},
  {name: 'Totally free', rmg: 'YES', udio: 'PARTIAL', spotify: 'PARTIAL'},
  {name: 'Works offline', rmg: 'YES', udio: 'NO', spotify: 'PARTIAL'},
  {name: 'Infinite songs', rmg: 'YES', udio: 'YES', spotify: 'NO'},
  {name: 'No ads', rmg: 'YES', udio: 'YES', spotify: 'Paid plans only'},
  {name: 'Download MIDI', rmg: 'YES', udio: 'NO', spotify: 'NO'},
  {name: 'Download WAV', rmg: 'YES', udio: 'YES', spotify: 'NO'},
  {name: 'Fancy visualizer', rmg: 'YES', udio: 'NO', spotify: 'NO'},
  {name: 'Open source', rmg: 'YES', udio: 'NO', spotify: 'NO'},
  {name: 'CO² per song', rmg: 'Very little', udio: 'Much', spotify: 'Very much'},
  {name: 'Plant trees', rmg: 'YES', udio: 'NO', spotify: 'NO'},
];

@Component({
  selector: 'app-compare',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './compare.component.html',
  styleUrl: './compare.component.scss'
})
export class CompareComponent {
  displayedColumns: string[] = ['name', 'rmg', 'udio', 'spotify'];
  dataSource = ELEMENT_DATA;
}
