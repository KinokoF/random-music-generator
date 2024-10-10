import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap, tap } from 'rxjs';
import { audioBufferToWav, MIDI, Synthetizer } from 'spessasynth_lib';
import { StartRenderingDataConfig } from 'spessasynth_lib/@types/synthetizer/synthetizer';

const SAMPLE_RATE = 44100;

@Injectable({
  providedIn: 'root',
})
export class RenderService {
  constructor(private http: HttpClient) {}

  render(midiBuffer: ArrayBuffer): Observable<string> {
    const midi = new MIDI(midiBuffer);
    const context = new OfflineAudioContext(
      2,
      SAMPLE_RATE * (midi.duration + 1),
      SAMPLE_RATE
    );
    const startRendering = { parsedMIDI: midi } as StartRenderingDataConfig;

    return forkJoin([
      this.http.get('FluidR3Mono_GM.sf3', { responseType: 'arraybuffer' }),
      context.audioWorklet.addModule(
        new URL('worklet_processor.min.js', import.meta.url)
      ),
    ]).pipe(
      tap(
        ([sfBuffer]) =>
          new Synthetizer(
            context.destination,
            sfBuffer,
            false,
            startRendering
          )
      ),
      switchMap(() => context.startRendering()),
      map((wavBuffer) => audioBufferToWav(wavBuffer)),
      map(URL.createObjectURL)
    );
  }
}
