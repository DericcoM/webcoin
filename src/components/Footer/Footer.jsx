import React from "react";
import "./Footer.css";

function Footer({ setCurrentPage, currentPage, setPreviousPage }) {
  return (
    <div className={currentPage === "boost" ? "footer boosted" : "footer"}>
      <div
        className="navButton"
        onClick={() => {
          setCurrentPage("buy");
          setPreviousPage("main");
        }}
      >
        <div id="players" className="navButtonImg">
          <img src="assets/user.png" alt="" />
        </div>
        <div className="navButtonText">Игроки</div>
      </div>
      <div
        className="navButton"
        onClick={() => {
          setCurrentPage("boost");
          setPreviousPage("main");
        }}
      >
        <div id="boost" className="navButtonImg">
          <img src="assets/boost.png" alt="" />
        </div>
        <div className="navButtonText">Апгрейд</div>
      </div>
      <div
        className="navButton"
        onClick={() => {
          setCurrentPage("trade");
          setPreviousPage("main");
        }}
      >
        <div id="trade" className="navButtonImg">
          <img src="assets/trade.png" alt="" />
        </div>
        <div className="navButtonText">Обмен</div>
      </div>
    </div>
  );
}

export default Footer;
