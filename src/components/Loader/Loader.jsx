import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-ring"></div>
      <div className="loader-case">
        <div className="loader-text">Загрузка</div>
        <div className="loader-dots">
          <span className="dot1">.</span>
          <span className="dot2">.</span>
          <span className="dot3">.</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
