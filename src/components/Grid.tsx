import React, { useState, useEffect } from "react";
import Node from "./Node";
import "./styles/Grid.css";
import { dijkstra } from "../algorithms/dijkstra";
import { Button } from "@material-ui/core";

const GRID_WIDTH = 50;
const GRID_HEIGHT = 25;

const Grid: React.FC<{}> = () => {
  const [start, setStart] = useState([10, 15]);
  const [finish, setFinish] = useState([10, 35]);
  //const [mouseDown, setMouseDown] = useState(false)
  const [dragState, setDragState] = useState("");

  // const getInitialGrid = () => {
  //   const grid = new Array(GRID_HEIGHT);
  //   for (let row = 0; row < GRID_HEIGHT; row++) {
  //     const currentRow = new Array(GRID_WIDTH);
  //     for (let col = 0; col < GRID_WIDTH; col++) {
  //       currentRow[col] = createNode(row, col);
  //     }
  //     grid[row] = currentRow;
  //   }
  //   return grid;
  // };

  // const createNode = (row: number, col: number) => {
  //   return {
  //     row,
  //     col,
  //     //   distance: Infinity,
  //     //   isVisited: false,
  //     //   isWall: false,
  //     //   previousNode: null,
  //   };
  // };

  //const [grid, setGrid] = useState(getInitialGrid());

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

        {/* {grid.map((row: any[], rowId: number) => (
          <tr className="row" key={rowId}>
            {row.map(
              (
                node: {
                  row: number;
                  col: number;
                },
                nodeId: number
              ) => {
                const { row, col } = node;
                return (
                  <Node
                    key={nodeId}
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
                );
              }
            )}
          </tr>
        ))} */}
      </tbody>
    </table>
  );
};

export default Grid;
