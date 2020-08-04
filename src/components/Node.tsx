import React from "react";
import "../styles/Node.css";
import { TNode } from "../types/TNode";
import { CSSTransition } from "react-transition-group";

interface Props extends TNode {
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
  pathOrder,
  visitedOrder,
  onMouseDown,
  onMouseEnter,
  isAnimate,
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
      {/* <CSSTransition in ={isAnimate} timeout={distance*100} classNames='node-animate' ></CSSTransition> */}
      <style children={isAnimate && fade} />

      <div
        className={isAnimate ? "node-animate" : undefined}
        style={{
          animationDuration: "0.2s",
          animationIterationCount: 1,
          animationName: "fade-in",
          animationTimingFunction: "ease-in",
          animationDelay: `${visitedOrder / 50}s`,
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
