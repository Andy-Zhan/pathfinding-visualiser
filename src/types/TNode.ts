export interface TNode {
  row: number;
  col: number;
  distance: number;
  isVisited: number;
  isWall: boolean;
  isPath: number;
  previousNode: TNode | null;
}
