import React from "react";
import "./styles/Node.css";
import { INode } from "../types/INode";

interface NodeProps extends INode {
  isStart: boolean;
  isFinish: boolean;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
}

const Node: React.FC<NodeProps> = ({
  row,
  col,
  isStart,
  isFinish,
  isPath,
  isVisited,
  onMouseDown,
  onMouseEnter,
}) => {
  const nodeType = isStart
    ? "node-start"
    : isFinish
    ? "node-finish"
    : isPath
    ? "node-path"
    : isVisited && "node-visited";
  return (
    <td
      id={`node ${row}-${col}`}
      className={`node ${nodeType}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
    ></td>
  );
};

export default Node;
