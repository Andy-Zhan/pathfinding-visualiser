import React from "react";
import "./Sidebar.css";
const Sidebar: React.FC<{}> = ({ children }) => (
  <div className="sidebar">
    <h1 className="logo">Pathfinding Visualiser</h1>
    {children}
  </div>
);

export default Sidebar;
