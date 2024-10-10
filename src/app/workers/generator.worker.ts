/// <reference lib="webworker" />

import { Chord } from '@tonaljs/chord';
import { Note } from '@tonaljs/pitch-note';
import { Config } from '../models/config.model';
import { generate } from '../utils/generator-utils';

addEventListener('message', (e) => {
  const events = generate(...(e.data as [Config, Note[], Chord[]]));
  postMessage(events);
});
