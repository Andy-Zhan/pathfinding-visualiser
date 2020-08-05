import React from "react";
import "../styles/Sidebar.css";
import { ReactComponent as HeartIcon } from "../img/heart.svg";
const Sidebar: React.FC<{}> = ({ children }) => (
  <div className="sidebar">
    <h1 className="logo">Pathfinding Visualiser</h1>
    {children}
    <div className="footer">
      <a
        href="https://github.com/Andy-Zhan/pathfinding-visualiser"
        className="footer-link"
      >
        Made with <HeartIcon className="heart-icon" /> by Andy Zhan
      </a>
    </div>
  </div>
);

export default Sidebar;
