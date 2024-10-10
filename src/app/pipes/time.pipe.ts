import { Pipe, PipeTransform } from '@angular/core';

function secondsToTime(seconds?: number): string {
  if (seconds !== undefined) {
    const s = Math.floor(seconds) % 60;
    const m = Math.floor(seconds / 60) % 60;
    const h = Math.floor(seconds / 60 / 60);

    return [h, String(m).padStart(2, '0'), String(s).padStart(2, '0')].join(':');
  } else {
    return '-:--:--';
  }
}

@Pipe({
  name: 'time',
  standalone: true,
})
export class TimePipe implements PipeTransform {
  transform(value?: number): string {
    return secondsToTime(value);
  }
}
