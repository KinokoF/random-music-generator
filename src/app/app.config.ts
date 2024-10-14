import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideServiceWorker } from '@angular/service-worker';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(), provideHttpClient(), { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 10 * 1000 } }, provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })]
};
