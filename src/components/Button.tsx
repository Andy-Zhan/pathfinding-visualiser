import React from "react";
import "../styles/Button.css";
interface Props {
  label?: string;
  onClick?: () => any;
}

const Button: React.FC<Props> = ({ label, onClick }) => (
  <div className="button-container">
    <button className="button" onClick={onClick}>
      {label}
    </button>
  </div>
);

export default Button;
