export interface TNode {
  row: number;
  col: number;
  distance: number;
  isVisited: boolean;
  isWall: boolean;
  isPath: boolean;
  previousNode: TNode | null;
}
