import { Instrument } from '../models/instrument.model';

// TODO: riordinare

export const TONICS = [
  {
    name: 'C',
    friendlyName: 'C',
    distanceFromC: '1P',
  },
  {
    name: 'C#',
    friendlyName: 'C#/Db',
    distanceFromC: '2m',
  },
  {
    name: 'D',
    friendlyName: 'D',
    distanceFromC: '2M',
  },
  {
    name: 'D#',
    friendlyName: 'D#/Eb',
    distanceFromC: '3m',
  },
  {
    name: 'E',
    friendlyName: 'E',
    distanceFromC: '3M',
  },
  {
    name: 'F',
    friendlyName: 'F',
    distanceFromC: '4P',
  },
  {
    name: 'F#',
    friendlyName: 'F#/Gb',
    distanceFromC: '5d',
  },
  {
    name: 'G',
    friendlyName: 'G',
    distanceFromC: '-4P',
  },
  {
    name: 'G#',
    friendlyName: 'G#/Ab',
    distanceFromC: '-3M',
  },
  {
    name: 'A',
    friendlyName: 'A',
    distanceFromC: '-3m',
  },
  {
    name: 'A#',
    friendlyName: 'A#/Bb',
    distanceFromC: '-2M',
  },
  {
    name: 'B',
    friendlyName: 'B',
    distanceFromC: '-2m',
  },
];

export const CHORD_ARPEGGIO_TYPES = [
  { name: 'FULL', friendlyName: 'No Arpeggio (Full)' },
  { name: 'ARP_ASC', friendlyName: 'Arpeggio Ascending' },
  { name: 'ARP_DESC', friendlyName: 'Arpeggio Descending' },
  { name: 'SEQ_ASC', friendlyName: 'Sequential Ascending' },
  { name: 'SEQ_DESC', friendlyName: 'Sequential Descending' },
  { name: 'RND', friendlyName: 'Random' },
];
export const CHORD_SEQ_NOTE_LENGTHS = [1, 2, 4];

export const MIDI_NOTE_MIN = 21;
export const MIDI_NOTE_MAX = 109;

export const INSTRUMENTS: Instrument[] = [
  {
    name: 'acoustic_grand_piano',
    friendlyName: 'Acoustic Grand Piano',
    midi: 0,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'bright_acoustic_piano',
    friendlyName: 'Bright Acoustic Piano',
    midi: 1,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'electric_grand_piano',
    friendlyName: 'Electric Grand Piano',
    midi: 2,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'honkytonk_piano',
    friendlyName: 'Honkytonk Piano',
    midi: 3,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'electric_piano_1',
    friendlyName: 'Electric Piano 1',
    midi: 4,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'electric_piano_2',
    friendlyName: 'Electric Piano 2',
    midi: 5,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'harpsichord',
    friendlyName: 'Harpsichord',
    midi: 6,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'clavinet',
    friendlyName: 'Clavinet',
    midi: 7,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'celesta',
    friendlyName: 'Celesta',
    midi: 8,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'glockenspiel',
    friendlyName: 'Glockenspiel',
    midi: 9,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'music_box',
    friendlyName: 'Music Box',
    midi: 10,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'vibraphone',
    friendlyName: 'Vibraphone',
    midi: 11,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'marimba',
    friendlyName: 'Marimba',
    midi: 12,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'xylophone',
    friendlyName: 'Xylophone',
    midi: 13,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'tubular_bells',
    friendlyName: 'Tubular Bells',
    midi: 14,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'dulcimer',
    friendlyName: 'Dulcimer',
    midi: 15,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'drawbar_organ',
    friendlyName: 'Drawbar Organ',
    midi: 16,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'percussive_organ',
    friendlyName: 'Percussive Organ',
    midi: 17,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'rock_organ',
    friendlyName: 'Rock Organ',
    midi: 18,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'church_organ',
    friendlyName: 'Church Organ',
    midi: 19,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'reed_organ',
    friendlyName: 'Reed Organ',
    midi: 20,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'accordion',
    friendlyName: 'Accordion',
    midi: 21,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'harmonica',
    friendlyName: 'Harmonica',
    midi: 22,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'tango_accordion',
    friendlyName: 'Tango Accordion',
    midi: 23,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'acoustic_guitar_nylon',
    friendlyName: 'Acoustic Guitar Nylon',
    midi: 24,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'acoustic_guitar_steel',
    friendlyName: 'Acoustic Guitar Steel',
    midi: 25,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'electric_guitar_jazz',
    friendlyName: 'Electric Guitar Jazz',
    midi: 26,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'electric_guitar_clean',
    friendlyName: 'Electric Guitar Clean',
    midi: 27,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'electric_guitar_muted',
    friendlyName: 'Electric Guitar Muted',
    midi: 28,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'overdriven_guitar',
    friendlyName: 'Overdriven Guitar',
    midi: 29,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'distortion_guitar',
    friendlyName: 'Distortion Guitar',
    midi: 30,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'guitar_harmonics',
    friendlyName: 'Guitar Harmonics',
    midi: 31,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'acoustic_bass',
    friendlyName: 'Acoustic Bass',
    midi: 32,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'electric_bass_finger',
    friendlyName: 'Electric Bass Finger',
    midi: 33,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'electric_bass_pick',
    friendlyName: 'Electric Bass Pick',
    midi: 34,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'fretless_bass',
    friendlyName: 'Fretless Bass',
    midi: 35,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'slap_bass_1',
    friendlyName: 'Slap Bass 1',
    midi: 36,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'slap_bass_2',
    friendlyName: 'Slap Bass 2',
    midi: 37,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'synth_bass_1',
    friendlyName: 'Synth Bass 1',
    midi: 38,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'synth_bass_2',
    friendlyName: 'Synth Bass 2',
    midi: 39,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'violin',
    friendlyName: 'Violin',
    midi: 40,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'viola',
    friendlyName: 'Viola',
    midi: 41,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'cello',
    friendlyName: 'Cello',
    midi: 42,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'contrabass',
    friendlyName: 'Contrabass',
    midi: 43,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'tremolo_strings',
    friendlyName: 'Tremolo Strings',
    midi: 44,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'pizzicato_strings',
    friendlyName: 'Pizzicato Strings',
    midi: 45,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'orchestral_harp',
    friendlyName: 'Orchestral Harp',
    midi: 46,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'timpani',
    friendlyName: 'Timpani',
    midi: 47,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'string_ensemble_1',
    friendlyName: 'String Ensemble 1',
    midi: 48,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'string_ensemble_2',
    friendlyName: 'String Ensemble 2',
    midi: 49,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'synth_strings_1',
    friendlyName: 'Synth Strings 1',
    midi: 50,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'synth_strings_2',
    friendlyName: 'Synth Strings 2',
    midi: 51,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'choir_aahs',
    friendlyName: 'Choir Aahs',
    midi: 52,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'voice_oohs',
    friendlyName: 'Voice Oohs',
    midi: 53,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'synth_choir',
    friendlyName: 'Synth Choir',
    midi: 54,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'orchestra_hit',
    friendlyName: 'Orchestra Hit',
    midi: 55,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'trumpet',
    friendlyName: 'Trumpet',
    midi: 56,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'trombone',
    friendlyName: 'Trombone',
    midi: 57,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'tuba',
    friendlyName: 'Tuba',
    midi: 58,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'muted_trumpet',
    friendlyName: 'Muted Trumpet',
    midi: 59,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'french_horn',
    friendlyName: 'French Horn',
    midi: 60,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'brass_section',
    friendlyName: 'Brass Section',
    midi: 61,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'synth_brass_1',
    friendlyName: 'Synth Brass 1',
    midi: 62,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'synth_brass_2',
    friendlyName: 'Synth Brass 2',
    midi: 63,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'soprano_sax',
    friendlyName: 'Soprano Sax',
    midi: 64,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'alto_sax',
    friendlyName: 'Alto Sax',
    midi: 65,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'tenor_sax',
    friendlyName: 'Tenor Sax',
    midi: 66,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'baritone_sax',
    friendlyName: 'Baritone Sax',
    midi: 67,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'oboe',
    friendlyName: 'Oboe',
    midi: 68,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'english_horn',
    friendlyName: 'English Horn',
    midi: 69,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'bassoon',
    friendlyName: 'Bassoon',
    midi: 70,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'clarinet',
    friendlyName: 'Clarinet',
    midi: 71,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'piccolo',
    friendlyName: 'Piccolo',
    midi: 72,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'flute',
    friendlyName: 'Flute',
    midi: 73,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'recorder',
    friendlyName: 'Recorder',
    midi: 74,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'pan_flute',
    friendlyName: 'Pan Flute',
    midi: 75,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'blown_bottle',
    friendlyName: 'Blown Bottle',
    midi: 76,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'shakuhachi',
    friendlyName: 'Shakuhachi',
    midi: 77,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'whistle',
    friendlyName: 'Whistle',
    midi: 78,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'ocarina',
    friendlyName: 'Ocarina',
    midi: 79,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'lead_1_square',
    friendlyName: 'Lead 1 Square',
    midi: 80,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'lead_2_sawtooth',
    friendlyName: 'Lead 2 Sawtooth',
    midi: 81,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'lead_3_calliope',
    friendlyName: 'Lead 3 Calliope',
    midi: 82,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'lead_4_chiff',
    friendlyName: 'Lead 4 Chiff',
    midi: 83,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'lead_5_charang',
    friendlyName: 'Lead 5 Charang',
    midi: 84,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'lead_6_voice',
    friendlyName: 'Lead 6 Voice',
    midi: 85,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'lead_7_fifths',
    friendlyName: 'Lead 7 Fifths',
    midi: 86,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'lead_8_bass__lead',
    friendlyName: 'Lead 8 Bass Lead',
    midi: 87,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'pad_1_new_age',
    friendlyName: 'Pad 1 New Age',
    midi: 88,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'pad_2_warm',
    friendlyName: 'Pad 2 Warm',
    midi: 89,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'pad_3_polysynth',
    friendlyName: 'Pad 3 Polysynth',
    midi: 90,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'pad_4_choir',
    friendlyName: 'Pad 4 Choir',
    midi: 91,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'pad_5_bowed',
    friendlyName: 'Pad 5 Bowed',
    midi: 92,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'pad_6_metallic',
    friendlyName: 'Pad 6 Metallic',
    midi: 93,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'pad_7_halo',
    friendlyName: 'Pad 7 Halo',
    midi: 94,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'pad_8_sweep',
    friendlyName: 'Pad 8 Sweep',
    midi: 95,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'fx_1_rain',
    friendlyName: 'Fx 1 Rain',
    midi: 96,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'fx_2_soundtrack',
    friendlyName: 'Fx 2 Soundtrack',
    midi: 97,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'fx_3_crystal',
    friendlyName: 'Fx 3 Crystal',
    midi: 98,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'fx_4_atmosphere',
    friendlyName: 'Fx 4 Atmosphere',
    midi: 99,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'fx_5_brightness',
    friendlyName: 'Fx 5 Brightness',
    midi: 100,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'fx_6_goblins',
    friendlyName: 'Fx 6 Goblins',
    midi: 101,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'fx_7_echoes',
    friendlyName: 'Fx 7 Echoes',
    midi: 102,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'fx_8_scifi',
    friendlyName: 'Fx 8 Scifi',
    midi: 103,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'sitar',
    friendlyName: 'Sitar',
    midi: 104,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'banjo',
    friendlyName: 'Banjo',
    midi: 105,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'shamisen',
    friendlyName: 'Shamisen',
    midi: 106,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'koto',
    friendlyName: 'Koto',
    midi: 107,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'kalimba',
    friendlyName: 'Kalimba',
    midi: 108,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'bagpipe',
    friendlyName: 'Bagpipe',
    midi: 109,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'fiddle',
    friendlyName: 'Fiddle',
    midi: 110,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'shanai',
    friendlyName: 'Shanai',
    midi: 111,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'tinkle_bell',
    friendlyName: 'Tinkle Bell',
    midi: 112,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'agogo',
    friendlyName: 'Agogo',
    midi: 113,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'steel_drums',
    friendlyName: 'Steel Drums',
    midi: 114,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'woodblock',
    friendlyName: 'Woodblock',
    midi: 115,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'taiko_drum',
    friendlyName: 'Taiko Drum',
    midi: 116,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'melodic_tom',
    friendlyName: 'Melodic Tom',
    midi: 117,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'synth_drum',
    friendlyName: 'Synth Drum',
    midi: 118,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'reverse_cymbal',
    friendlyName: 'Reverse Cymbal',
    midi: 119,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'guitar_fret_noise',
    friendlyName: 'Guitar Fret Noise',
    midi: 120,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'breath_noise',
    friendlyName: 'Breath Noise',
    midi: 121,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'seashore',
    friendlyName: 'Seashore',
    midi: 122,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'bird_tweet',
    friendlyName: 'Bird Tweet',
    midi: 123,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'telephone_ring',
    friendlyName: 'Telephone Ring',
    midi: 124,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'helicopter',
    friendlyName: 'Helicopter',
    midi: 125,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'applause',
    friendlyName: 'Applause',
    midi: 126,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
  {
    name: 'gunshot',
    friendlyName: 'Gunshot',
    midi: 127,
    fg: true,
    bg: true,
    min: 'A0',
    max: 'C8',
  },
];
