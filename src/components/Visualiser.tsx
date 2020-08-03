import React, { useState } from "react";
import Grid from "./Grid";
import Sidebar from "./Sidebar";
import AlgoSelect from "./AlgoSelect";

const Visualiser: React.FC<{}> = () => {
  const algos = [
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

  return (
    <div>
      <Sidebar>
        <AlgoSelect setAlgo={setAlgo} />
      </Sidebar>
      <Grid />
    </div>
  );
};

export default Visualiser;
