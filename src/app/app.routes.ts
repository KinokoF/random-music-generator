import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CompareComponent } from './compare/compare.component';
import { ConfigComponent } from './config/config.component';
import { GeneratorComponent } from './generator/generator.component';
import { HomeComponent } from './home/home.component';
import { PresetsComponent } from './presets/presets.component';
import { SongsComponent } from './songs/songs.component';
import { VisualizerComponent } from './visualizer/visualizer.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'generator', component: GeneratorComponent },
  { path: 'songs', component: SongsComponent },
  { path: 'presets', component: PresetsComponent },
  { path: 'visualizer', component: VisualizerComponent },
  { path: 'compare', component: CompareComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: 'home' },
];
