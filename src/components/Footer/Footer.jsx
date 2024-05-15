import React from "react";
import "./Footer.css";

function Footer({ setCurrentPage }) {
  return (
    <div className="footer">
      <div className="navButton" onClick={() => setCurrentPage('players')}>
        <div id="players" className="navButtonImg"></div>
        <div className="navButtonText">Игроки</div>
      </div>
      <div className="navButton" onClick={() => setCurrentPage('boost')}>
        <div id="boost" className="navButtonImg"></div>
        <div className="navButtonText">Апгрейд</div>
      </div>
      <div className="navButton" onClick={() => setCurrentPage('trade')}>
        <div id="trade" className="navButtonImg"></div>
        <div className="navButtonText">Обмен</div>
      </div>
    </div>
  );
}

export default Footer;
