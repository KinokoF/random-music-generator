import { Performance } from './performance.model';

export type Child = Node | Performance;

export interface Node {
  loop: number;
  childs: Child[];
}
