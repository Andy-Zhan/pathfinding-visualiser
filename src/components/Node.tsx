import React from "react";
import "./styles/Node.css";
import { TNode } from "../types/TNode";

interface Props extends INode {
  isStart: boolean;
  isFinish: boolean;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
}

const Node: React.FC<Props> = ({
  row,
  col,
  isStart,
  isFinish,
  distance,
  isWall,
  isPath,
  isVisited,
  onMouseDown,
  onMouseEnter,
}) => {
  const nodeType = isStart
    ? "node-start"
    : isFinish
    ? "node-finish"
    : isWall
    ? "node-wall"
    : isPath
    ? "node-path"
    : isVisited && "node-visited";
  return (
    <td
      id={`node ${row}-${col}`}
      className={`node ${nodeType}`}
      style={
        nodeType === "node-visited"
          ? {
              backgroundColor: `rgb(${68 + (distance / 42) * (80 - 68)}, ${
                80 + (distance / 42) * (197 - 80)
              }, ${204 + (distance / 42) * (228 - 204)})`,
            }
          : undefined
      }
      onMouseDown={(e: React.MouseEvent<HTMLTableDataCellElement>) => {
        e.preventDefault();
        onMouseDown(row, col);
      }}
      onMouseEnter={(e: React.MouseEvent<HTMLTableDataCellElement>) => {
        e.preventDefault();
        onMouseEnter(row, col);
      }}
      onDragStart={(e: React.DragEvent<HTMLTableDataCellElement>) =>
        e.preventDefault()
      }
    ></td>
  );
};

export default Node;
