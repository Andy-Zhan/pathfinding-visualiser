export interface INode {
  row: number;
  col: number;
  distance: number;
  isVisited: boolean;
  isWall: boolean;
  isPath: boolean;
  previousNode: INode | null;
}
