import React, { useState, useEffect, useReducer, useCallback } from "react";
import Node from "./Node";
import "./styles/Grid.css";
import { dijkstra } from "../algorithms/dijkstra";
import { INode } from "../types/INode";
import { Button } from "@material-ui/core";

const GRID_WIDTH = 50;
const GRID_HEIGHT = 25;

// interface GridProps {
//   mode: string;
// }

const Grid: React.FC<{}> = () => {
  const getInitialGrid = () => {
    const grid = new Array(GRID_HEIGHT);
    for (let row = 0; row < GRID_HEIGHT; row++) {
      const currentRow = new Array(GRID_WIDTH);
      for (let col = 0; col < GRID_WIDTH; col++) {
        currentRow[col] = {
          row,
          col,
          isVisited: false,
          isPath: false,
          isWall: false,
          distance: Infinity,
          weight: 1,
          previousNode: null,
        };
      }
      grid[row] = currentRow;
    }
    return grid;
  };

  // const gridReducer = (state, action) => {
  //   newGrid = state.slice()

  //   return state
  // }

  const [grid, setGrid] = useState(getInitialGrid());
  const [start, setStart] = useState([10, 15]);
  const [finish, setFinish] = useState([10, 35]);
  const [dragState, setDragState] = useState("");
  const [algo, setAlgo] = useState(() => dijkstra);

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

  // const showPath = (visitedNodes: INode[], shortestPath: INode[]) => {
  //   const newGrid = grid.slice();
  //   visitedNodes.forEach(
  //     (n: INode) => (newGrid[n.row][n.col].isVisited = true)
  //   );
  //   shortestPath.forEach((n: INode) => (newGrid[n.row][n.col].isPath = true));
  //   setGrid(newGrid);
  // };

  // const clearPath = () => {
  //   grid.forEach((row) =>
  //     row.forEach((node: INode) => {
  //       node.isVisited = false;
  //       node.isPath = false;
  //       node.distance = Infinity;
  //       node.previousNode = null;
  //     })
  //   );
  // };

  const [b, setB] = useState(1);

  const run = useCallback(() => {
    // const newGrid = grid.slice();
    // newGrid.forEach((row) =>
    //   row.forEach((node: INode) => {
    //     node.isVisited = false;
    //     node.isPath = false;
    //     node.distance = Infinity;
    //     node.previousNode = null;
    //   })
    // );
    //setGrid(newGrid);
    // const result = algo(
    //   grid,
    //   grid[start[0]][start[1]],
    //   grid[finish[0]][finish[1]]
    // );
    // let visitedNodes: INode[], shortestPath: INode[];
    // if (result) {
    //   [visitedNodes, shortestPath] = result;
    //   const newGrid2 = grid.slice();
    //   visitedNodes.forEach(
    //     (n: INode) => (newGrid[n.row][n.col].isVisited = true)
    //   );
    //   shortestPath.forEach((n: INode) => (newGrid[n.row][n.col].isPath = true));
    //   setGrid(newGrid2);
    // }
    setB(b + 1);
  }, [b]);

  useEffect(() => {
    console.log("ffcall");
    run();
  }, [start, finish]);

  return (
    <div>
      <Button onClick={run}>Visualise!</Button>
      <table className="grid">
        <tbody>
          {grid.map((row: INode[], rowId: number) => (
            <tr className="row" key={rowId}>
              {row.map((node: INode, nodeId: number) => {
                const {
                  row,
                  col,
                  isVisited,
                  distance,
                  isWall,
                  isPath,
                  previousNode,
                } = node;
                return (
                  <Node
                    key={nodeId}
                    row={row}
                    col={col}
                    distance={distance}
                    isVisited={isVisited}
                    isWall={isWall}
                    isPath={isPath}
                    previousNode={previousNode}
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
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grid;
