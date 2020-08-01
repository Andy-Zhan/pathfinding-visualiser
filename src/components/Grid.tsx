import React, { useState, useEffect } from "react";
import Node from "./Node";
import "./styles/Grid.css";
import { dijkstra } from "../algorithms/dijkstra";

const GRID_WIDTH = 50;
const GRID_HEIGHT = 25;

interface GridProps {
  mode: string;
}

const Grid: React.FC<GridProps> = ({ mode }) => {
  const [start, setStart] = useState([10, 15]);
  const [finish, setFinish] = useState([10, 35]);
  const [dragState, setDragState] = useState("");

  const handleMouseDown = (row: number, col: number) => {
    if (row === start[0] && col === start[1]) setDragState("start");
    else if (row === finish[0] && col === finish[1]) setDragState("finish");
    else setDragState("wall");
  };

  const handleMouseUp = () => {
    setDragState("");
  };

  useEffect(() => {
    if (dragState) document.addEventListener("mouseup", handleMouseUp);
    else document.removeEventListener("mouseup", handleMouseUp);
  }, [dragState]);

  useEffect(() => {
    console.log(dragState);
  }, [dragState]);

  const handleMouseEnter = (row: number, col: number) => {
    switch (dragState) {
      case "start":
        setStart([row, col]);
        break;
      case "finish":
        setFinish([row, col]);
        break;
      case "wall":
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    const visitedNodes,
      shortestPath = dijkstra(start, finish);
  }, [mode, start, finish]);

  return (
    <table className="grid">
      <tbody>
        {Array.from({ length: GRID_HEIGHT }, (_, row) => (
          <tr className="row" key={row}>
            {Array.from({ length: GRID_WIDTH }, (_, col) => (
              <Node
                key={`${row}-${col}`}
                row={row}
                col={col}
                isStart={row === start[0] && col === start[1]}
                isFinish={row === finish[0] && col === finish[1]}
                onMouseDown={(row: number, col: number) =>
                  handleMouseDown(row, col)
                }
                onMouseEnter={(row: number, col: number) =>
                  handleMouseEnter(row, col)
                }
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Grid;
