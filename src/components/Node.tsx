import React from "react";
import "./styles/Node.css";

interface NodeProps {
  row: number;
  col: number;
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
  onMouseDown,
  onMouseEnter,
}) => {
  const nodeType = isStart ? "node-start" : isFinish && "node-finish";
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
