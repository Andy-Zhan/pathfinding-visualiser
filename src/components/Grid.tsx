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

  type nodesAction =
    | {
        type: "CLEAR_PATH";
      }
    | {
        type: "SET_NODE";
        property: "isVisited" | "isPath";
        row: number;
        col: number;
        value: boolean;
      }
    | {
        type: "SET_START";
        row: number;
        col: number;
      }
    | {
        type: "SET_FINISH";
        row: number;
        col: number;
      };

  const nodesReducer = (
    state: { grid: INode[][]; start: number[]; finish: number[] },
    action: nodesAction
  ) => {
    let newGrid = state.grid.slice();
    switch (action.type) {
      case "CLEAR_PATH":
        newGrid.forEach((row) =>
          row.forEach((node: INode) => {
            node.isVisited = false;
            node.isPath = false;
            node.distance = Infinity;
            node.previousNode = null;
          })
        );
        return { ...state, grid: newGrid };
      case "SET_NODE": {
        const { property, row, col, value } = action;
        newGrid[row][col][property] = value;
        return { ...state, grid: newGrid };
      }
      case "SET_START": {
        const { row, col } = action;

        return { ...state, start: [row, col] };
      }
      case "SET_FINISH": {
        const { row, col } = action;
        return { ...state, finish: [row, col] };
      }
      default:
        throw new Error();
    }
  };

  const [nodes, dispatchNodes] = useReducer(nodesReducer, {
    grid: getInitialGrid(),
    start: [10, 15],
    finish: [10, 35],
  });
  // const [start, setStart] = useState([10, 15]);
  // const [finish, setFinish] = useState([10, 35]);
  const [dragState, setDragState] = useState("");
  const [algo, setAlgo] = useState(() => dijkstra);

  const handleMouseDown = (row: number, col: number) => {
    if (row === nodes.start[0] && col === nodes.start[1]) setDragState("start");
    else if (row === nodes.finish[0] && col === nodes.finish[1])
      setDragState("finish");
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
        dispatchNodes({ type: "SET_START", row: row, col: col });
        break;
      case "finish":
        dispatchNodes({ type: "SET_FINISH", row: row, col: col });
        break;
      case "wall":
        break;
      default:
        return;
    }
  };

  const run = () => {
    const showPath = (visitedNodes: INode[], shortestPath: INode[]) => {
      visitedNodes.forEach((n: INode) =>
        dispatchNodes({
          type: "SET_NODE",
          property: "isVisited",
          row: n.row,
          col: n.col,
          value: true,
        })
      );
      shortestPath.forEach((n: INode) =>
        dispatchNodes({
          type: "SET_NODE",
          property: "isPath",
          row: n.row,
          col: n.col,
          value: true,
        })
      );
    };

    dispatchNodes({ type: "CLEAR_PATH" });
    const result = algo(
      nodes.grid,
      nodes.grid[nodes.start[0]][nodes.start[1]],
      nodes.grid[nodes.finish[0]][nodes.finish[1]]
    );
    let visitedNodes: INode[], shortestPath: INode[];
    if (result) {
      [visitedNodes, shortestPath] = result;
      showPath(visitedNodes, shortestPath);
    }
  };

  // useEffect(() => {
  //   console.log("call");
  //   run();
  // }, [start, finish, run]);

  return (
    <div>
      <Button onClick={run}>Visualise!</Button>
      <table className="grid">
        <tbody>
          {nodes.grid.map((row: INode[], rowId: number) => (
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
                    isStart={row === nodes.start[0] && col === nodes.start[1]}
                    isFinish={
                      row === nodes.finish[0] && col === nodes.finish[1]
                    }
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
