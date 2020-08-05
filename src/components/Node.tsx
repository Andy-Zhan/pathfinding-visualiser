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
  visitedNodeLength: number;
}

const Node = React.memo<Props>(
  ({
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
    visitedNodeLength,
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

    const baseStyles: React.CSSProperties = {
      position: "absolute",
      top: 4,
      left: 4,
      zIndex: 1,
      animationDuration: "0.2s",
      animationIterationCount: 1,
      animationName: "fade-in",
      opacity: isAnim ? 0 : undefined,
      animationTimingFunction: "ease-in",
      animationFillMode: "forwards",
      width: "calc(100% - 8px)",
      height: "calc(100% - 8px)",
      willChange: "opacity",
    };

    const visitedStyles: React.CSSProperties = {
      ...baseStyles,
      animationDelay: `${visitedOrder / 100}s`,
      backgroundColor:
        nodeType === "node-visited" || nodeType === "node-path"
          ? `rgb(${68 + (distance / 42) * (80 - 68)}, ${
              80 + (distance / 42) * (197 - 80)
            }, ${204 + (distance / 42) * (228 - 204)})`
          : undefined,
    };

    const pathStyles: React.CSSProperties = {
      ...baseStyles,
      animationDelay: `${(visitedNodeLength + pathOrder) / 100}s`,
      backgroundColor: nodeType === "node-path" ? "#ffb700" : undefined,
    };

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

        <div style={visitedStyles} />
        <div style={pathStyles} />
      </td>
    );
  }
);

export default Node;
