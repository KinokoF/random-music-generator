import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { WaResizeObserver } from '@ng-web-apis/resize-observer';
import { VisualizerService } from '../services/visualizer.service';

@Component({
  selector: 'app-visualizer',
  standalone: true,
  imports: [WaResizeObserver],
  templateUrl: './visualizer.component.html',
  styleUrl: './visualizer.component.scss',
})
export class VisualizerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('visualizer')
  private visualizer: ElementRef<HTMLCanvasElement> | undefined;

  constructor(private visualizerService: VisualizerService) {}

  ngAfterViewInit(): void {
    this.visualizerService.start(this.visualizer!.nativeElement);
  }

  onResize(event: readonly ResizeObserverEntry[]): void {
    const entry = event[0];
    this.visualizerService.resize(
      entry.contentRect.width,
      entry.contentRect.height
    );
  }

  ngOnDestroy(): void {
    this.visualizerService.stop();
  }
}
