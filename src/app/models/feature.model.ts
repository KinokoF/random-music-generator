export type Availability = 'YES' | 'PARTIAL' | 'NO' | string;

export interface Feature {
  name: string;
  rmg: Availability;
  udio: Availability;
  spotify: Availability;
}
