import React, { useState } from "react";
import "./App.css";
import Grid from "./components/Grid";
import { Button } from "@material-ui/core";

function App() {
  //const [mode, setMode] = useState("");
  return (
    //<div>
    //<Button onClick={() => setMode("dijkstra")}>Visualise!</Button>
    <Grid />
    //</div>
  );
}

export default App;
