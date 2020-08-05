import React from "react";
import "../styles/Node.css";
import { TNode } from "../types/TNode";

interface Props extends TNode {
  isStart: boolean;
  isFinish: boolean;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  isAnim: boolean;
  animSpeed: number;
}

const Node: React.FC<Props> = ({
  row,
  col,
  isStart,
  isFinish,
  distance,
  isWall,
  pathOrder,
  visitedOrder,
  onMouseDown,
  onMouseEnter,
  isAnim,
  animSpeed,
}) => {
  const nodeType = isStart
    ? "node-start"
    : isFinish
    ? "node-finish"
    : isWall
    ? "node-wall"
    : !!pathOrder
    ? "node-path"
    : !!visitedOrder && "node-visited";

  const fade = ` @keyframes fade-in {
from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
    }`;
  console.log(visitedOrder);
  return (
    <td
      id={`node ${row}-${col}`}
      className={`node ${nodeType}`}
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
    >
      <style children={isAnim && fade} />

      <div
        className={isAnim ? "node-animate" : undefined}
        style={{
          animationDuration: "0.2s",
          animationIterationCount: 1,
          animationName: "fade-in",
          animationTimingFunction: "ease-in",
          animationDelay: `${visitedOrder / 100}s`,
          animationFillMode: "forwards",
          width: "100%",
          height: "100%",
          backgroundColor:
            nodeType === "node-visited"
              ? `rgb(${68 + (distance / 42) * (80 - 68)}, ${
                  80 + (distance / 42) * (197 - 80)
                }, ${204 + (distance / 42) * (228 - 204)})`
              : undefined,
        }}
      />
    </td>
  );
};

export default Node;
