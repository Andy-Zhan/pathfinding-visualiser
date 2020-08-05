import { TNode } from "./TNode";

export interface TAlgo {
  name: string;
  shortName: string;
  guaranteesShortest: boolean;
  weighted: boolean;
  algorithm: (
    grid: TNode[][],
    start: number[],
    finish: number[]
  ) => TNode[][] | undefined;
}
