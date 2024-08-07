import React from "react";
import "./Footer.css";

function Footer({
  setCurrentPage,
  currentPage,
  setPreviousPage,
  userId,
  lang,
}) {
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
        <div className="navButtonText">{lang.lang === "ru" ? "Игроки" : "Workers"}</div>
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
        <div className="navButtonText">{lang.lang === "ru" ? "Апгрейд" : "Boost"}</div>
      </div>
      <div
        className="navButton"
        onClick={() => {
          setCurrentPage("trade");
          setPreviousPage("main");
          userId = { userId };
        }}
      >
        <div id="trade" className="navButtonImg">
          <img src="assets/trade.png" alt="" />
        </div>
        <div className="navButtonText">{lang.lang === "ru" ? "Обмен" : "Trade"}</div>
      </div>
    </div>
  );
}

export default Footer;
