import React, { useEffect, useState, useCallback } from "react";
import "../styles/Grid.css";
import { TNode } from "../types/TNode";
import Node from "./Node";

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

interface Props {
  gridState: [TNode[][], React.Dispatch<React.SetStateAction<TNode[][]>>];
  startState: [number[], React.Dispatch<React.SetStateAction<number[]>>];
  finishState: [number[], React.Dispatch<React.SetStateAction<number[]>>];
  run: () => void;
  isAnim: boolean;
  animSpeed: number;
  visitedNodeLength: number;
}

const Grid: React.FC<Props> = ({
  gridState: [grid, setGrid],
  startState: [start, setStart],
  finishState: [finish, setFinish],
  run,
  isAnim,
  animSpeed,
  visitedNodeLength,
}) => {
  const [dragState, setDragState] = useState<MouseMode>(MouseMode.Off);

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
      if (!!grid[row][col].pathOrder) run();
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    e.preventDefault();
    setDragState(MouseMode.Off);
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
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
        if (!!grid[row][col].pathOrder) run();
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
                const { row, col } = node;
                return (
                  <Node
                    key={nodeId}
                    {...node}
                    isStart={row === start[0] && col === start[1]}
                    isFinish={row === finish[0] && col === finish[1]}
                    isAnim={isAnim}
                    animSpeed={animSpeed}
                    visitedNodeLength={visitedNodeLength}
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
