import React, { useState, useEffect, useCallback } from "react";
import Node from "./Node";
import "./styles/Grid.css";
import { dijkstra } from "../algorithms/dijkstra";
import { TNode } from "../types/TNode";

const GRID_WIDTH = 42;
const GRID_HEIGHT = 22;

// interface GridProps {
//   mode: string;
// }

const cloneArray = (arr: any[][]) => {
  return arr.map((row) => row.slice(0));
};

enum MouseMode {
  Start,
  Finish,
  AddWall,
  RemoveWall,
  Off,
}

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
  const [dragState, setDragState] = useState<MouseMode>(MouseMode.Off);
  const [algo, setAlgo] = useState(() => dijkstra);

  const handleMouseDown = (row: number, col: number) => {
    if (row === start[0] && col === start[1]) setDragState(MouseMode.Start);
    else if (row === finish[0] && col === finish[1])
      setDragState(MouseMode.Finish);
    else if (grid[row][col].isWall) {
      setNodeState(row, col, "isWall", false);
      setDragState(MouseMode.RemoveWall);
      run();
    } else {
      setNodeState(row, col, "isWall", true);
      setDragState(MouseMode.AddWall);
      if (grid[row][col].isPath) run();
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    e.preventDefault();
    setDragState(MouseMode.Off);
  };

  useEffect(() => {
    if (dragState) document.addEventListener("mouseup", handleMouseUp);
    else document.removeEventListener("mouseup", handleMouseUp);
  }, [dragState]);

  const handleMouseEnter = (row: number, col: number) => {
    switch (dragState) {
      case MouseMode.Start:
        setStart([row, col]);
        break;
      case MouseMode.Finish:
        setFinish([row, col]);
        break;
      case MouseMode.AddWall:
        if (
          !grid[row][col].isWall &&
          !(row === start[0] && col === start[1]) &&
          !(row === finish[0] && col === finish[1])
        )
          setNodeState(row, col, "isWall", true);
        if (grid[row][col].isVisited) run();
        break;
      case MouseMode.RemoveWall:
        if (grid[row][col].isWall) {
          setNodeState(row, col, "isWall", false);
          run();
        }
        break;
      default:
        return;
    }
  };

  const setNodeState = (
    row: number,
    col: number,
    prop: string,
    value: boolean
  ) => {
    setGrid((prevGrid) => {
      const newGrid = cloneArray(prevGrid);
      newGrid[row][col][prop] = value;
      return newGrid;
    });
  };

  const clearPath = () => {
    setGrid((prevGrid) => {
      const newGrid = cloneArray(prevGrid);
      newGrid.forEach((row) =>
        row.forEach((node: TNode) => {
          node.isVisited = false;
          node.isPath = false;
          node.distance = Infinity;
          node.previousNode = null;
        })
      );
      return newGrid;
    });
  };

  const run = useCallback(() => {
    clearPath();

    setGrid((prevGrid) => {
      const newGrid = cloneArray(prevGrid);
      const shortestPath = algo(newGrid, start, finish);
      if (shortestPath) {
        shortestPath.forEach(
          (n: TNode) => (newGrid[n.row][n.col].isPath = true)
        );

        return newGrid;
      }
      return prevGrid;
    });

    //setB(b + 1);
  }, [algo, finish, start]);

  useEffect(() => {
    run();
  }, [start, finish, run]);

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        return false;
      }}
      className="gridContainer"
    >
      <table className="grid">
        <tbody>
          {grid.map((row: TNode[], rowId: number) => (
            <tr className="row" key={rowId}>
              {row.map((node: TNode, nodeId: number) => {
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
