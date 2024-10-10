import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WakeService {
  private sentinel: WakeLockSentinel | undefined;

  on(): void {
    if (navigator.wakeLock && !this.sentinel) {
      navigator.wakeLock
        .request()
        .then((sentinel) => (this.sentinel = sentinel));
    }
  }

  off(): void {
    this.sentinel?.release();
    this.sentinel = undefined;
  }
}
