import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component';
import { PlayerComponent } from './player/player.component';
import { GeneratorService } from './services/generator.service';
import { PlayerService } from './services/player.service';
import { VisualizerService } from './services/visualizer.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavigationComponent, PlayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'random-music-generator';

  constructor(
    private playerService: PlayerService,
    private generatorService: GeneratorService,
    private visualizerService: VisualizerService
  ) {}

  ngOnInit(): void {
    this.generatorService.init();
    this.playerService.init();
    this.visualizerService.init();
  }
}
