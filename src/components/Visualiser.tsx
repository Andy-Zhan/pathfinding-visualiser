import React, { useEffect, useState, useCallback } from "react";
import { TAlgo } from "../types/TAlgo";
import AlgoSelect from "./AlgoSelect";
import Grid from "./Grid";
import Sidebar from "./Sidebar";
import { TNode } from "../types/TNode";
import Button from "./Button";
import Slider from "@bit/mui-org.material-ui.slider";

import { dijkstra } from "../algorithms/dijkstra";

const Visualiser: React.FC<{}> = () => {
  const algos: TAlgo[] = [
    {
      name: "Dijkstra's Algorithm",
      shortName: "dijkstra",
      guaranteesShortest: true,
      weighted: true,
      algorithm: dijkstra,
    },
    {
      name: "Depth-first search",
      shortName: "dfs",
      guaranteesShortest: false,
      weighted: false,
      algorithm: dijkstra,
    },
  ];

  const [algo, setAlgo] = useState(algos[0]);
  const [animToggle, setAnimToggle] = useState(true);
  const [isAnim, setAnim] = useState(false);
  const [animSpeed, setAnimSpeed] = useState<number>(100);
  const [visitedNodeLength, setVisitedNodeLength] = useState<number>(0);

  const GRID_WIDTH = 42;
  const GRID_HEIGHT = 22;

  const cloneArray = (arr: any[][]) => {
    return arr.map((row) => row.slice(0));
  };

  const getInitialGrid = () => {
    const grid = new Array(GRID_HEIGHT);
    for (let row = 0; row < GRID_HEIGHT; row++) {
      const currentRow = new Array(GRID_WIDTH);
      for (let col = 0; col < GRID_WIDTH; col++) {
        currentRow[col] = {
          row,
          col,
          visitedOrder: 0,
          pathOrder: 0,
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

  const [grid, setGrid] = useState(getInitialGrid());
  const [start, setStart] = useState([10, 15]);
  const [finish, setFinish] = useState([10, 35]);

  const run = useCallback(() => {
    const clearPath = () => {
      setAnim(false);
      setGrid((prevGrid) => {
        const newGrid = cloneArray(prevGrid);
        newGrid.forEach((row) =>
          row.forEach((node: TNode) => {
            node.visitedOrder = 0;
            node.pathOrder = 0;
            node.distance = Infinity;
            node.previousNode = null;
          })
        );
        return newGrid;
      });
    };

    clearPath();

    setGrid((prevGrid) => {
      const newGrid = cloneArray(prevGrid);
      const result = algo.algorithm(newGrid, start, finish);
      if (!result) return prevGrid;
      // const [visitedNodes, shortestPath] = result;
      return newGrid;
    });
  }, [algo, finish, start]);

  const clearWalls = () => {
    setGrid((prevGrid) => {
      const newGrid = cloneArray(prevGrid);
      newGrid.forEach((row) =>
        row.forEach((node: TNode) => {
          node.isWall = false;
        })
      );
      return newGrid;
    });
    run();
  };

  const animate = () => {
    setAnim(false);
    setAnimToggle(false);
  };

  useEffect(() => {
    if (!animToggle) {
      setAnimToggle(true);
      setAnim(true);
    }
  }, [animToggle]);

  useEffect(() => {
    run();
  }, [run]);

  return (
    <div>
      <Sidebar>
        <AlgoSelect algos={algos} setAlgo={setAlgo} />
        <span className="text">
          {algo.name} is {algo.weighted ? "a " : "an "}
          <span style={{ color: "rgb(255,255,255,0.87)" }}>
            {algo.weighted ? "weighted" : "unweighted"}
          </span>{" "}
          algorithm and{" "}
          <span style={{ color: "rgb(255,255,255,0.87)" }}>
            {algo.guaranteesShortest ? "guarantees" : "does not guarantee"}
          </span>{" "}
          the shortest path.
        </span>

        <Button label="Clear Walls" onClick={clearWalls} />
        <Button label="Show Animation" onClick={animate} />
        <Slider
          min={5}
          max={200}
          value={animSpeed}
          onChange={(e: any, newValue: number | number[]) =>
            setAnimSpeed(newValue as number)
          }
        />
      </Sidebar>
      <Grid
        gridState={[grid, setGrid]}
        startState={[start, setStart]}
        finishState={[finish, setFinish]}
        run={run}
        isAnim={isAnim}
        animSpeed={100}
        visitedNodeLength={isAnim ? grid[finish[0]][finish[1]].visitedOrder : 0}
      />
    </div>
  );
};

export default Visualiser;
