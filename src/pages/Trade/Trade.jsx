import React, { useRef, useEffect, useState } from "react";
import "./Trade.css";

function Trade({ setCurrentPage }) {
  const buyScrollRef = useRef(null);
  const adjustMainScrollHeight = () => {
    if (buyScrollRef.current) {
      const windowHeight = window.innerHeight;
      const footerHeight = 80; // Высота подвала
      const maxScrollHeight = windowHeight - footerHeight - 90; // 100 пикселей от низа
      buyScrollRef.current.style.maxHeight = `${maxScrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustMainScrollHeight();
    window.addEventListener("resize", adjustMainScrollHeight);
    return () => {
      window.removeEventListener("resize", adjustMainScrollHeight);
    };
  }, []);

  return (
    <>
      <div className="trade">
        <div className="boostTitle">Баланс</div>
        <div className="buyScrollContainer" ref={buyScrollRef}>
          <div className="balanceValue">
            4,335
            <div className="balanceValueImg">
              <img src="assets/star.png" alt="" />
            </div>
          </div>
          <div className="statistics">Статистика:</div>
          <div className="workerPlayersUnit">
            <div className="workerPlayersUnitGroup">
              <div className="workerPlayersUnitPoint">B:</div>
              <div className="workerPlayersUnitCount">N чел.</div>
            </div>
          </div>
          <div className="workerPlayersUnit">
            <div className="workerPlayersUnitGroup">
              <div className="workerPlayersUnitPoint">C:</div>
              <div className="workerPlayersUnitCount">N чел.</div>
            </div>
          </div>
          <div className="workerPlayersUnit">
            <div className="workerPlayersUnitGroup">
              <div className="workerPlayersUnitPoint">D:</div>
              <div className="workerPlayersUnitCount">N чел.</div>
            </div>
          </div>
          <div className="workerPlayersUnit">
            <div className="workerPlayersUnitGroup">
              <div className="workerPlayersUnitPoint">E:</div>
              <div className="workerPlayersUnitCount">N чел.</div>
            </div>
          </div>
          <div className="workerPlayersUnit">
            <div className="workerPlayersUnitGroup">
              <div className="workerPlayersUnitPoint">F:</div>
              <div className="workerPlayersUnitCount">N чел.</div>
            </div>
          </div>
          <div className="workerPlayersUnit">
            <div className="workerPlayersUnitGroup">
              <div className="workerPlayersUnitPoint">G:</div>
              <div className="workerPlayersUnitCount">N чел.</div>
            </div>
          </div>
          <div className={"workerUp buy free"}>
            <p className={"workerUpTitle free"}>Обменять</p>
          </div>
          <div className="convention">Правила пользования</div>
        </div>
      </div>
    </>
  );
}

export default Trade;
