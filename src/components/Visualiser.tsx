import React, { useState, useEffect } from "react";
import Grid from "./Grid";
import Sidebar from "./Sidebar";
import AlgoSelect from "./AlgoSelect";
import { TAlgo } from "../types/TAlgo";

const Visualiser: React.FC<{}> = () => {
  const algos: TAlgo[] = [
    {
      name: "Dijkstra's Algorithm",
      shortName: "dijkstra",
      guaranteesShortest: true,
      weighted: true,
    },
    {
      name: "Depth-first search",
      shortName: "dfs",
      guaranteesShortest: false,
      weighted: false,
    },
  ];

  const [algo, setAlgo] = useState(algos[0]);

  useEffect(() => {
    console.log(algo);
  }, [algo]);

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
      </Sidebar>
      <Grid />
    </div>
  );
};

export default Visualiser;
