export interface TNode {
  row: number;
  col: number;
  distance: number;
  visitedOrder: number;
  isWall: boolean;
  pathOrder: number;
  previousNode: TNode | null;
  isAnimate: boolean;
}
