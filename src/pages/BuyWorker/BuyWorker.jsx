import React from "react";
import "./BuyWorker.css";

function BuyWorker({ buyWorkerID, setCurrentPage, setPreviusPage }) {
  const balance = buyWorkerID.price.toLocaleString("en-US");
  const shield = "1ч 27мин";
  const payment = (
    Math.floor(Math.random() * (50000 - 500 + 1)) + 500
  ).toLocaleString("en-US");
  const star = (
    Math.floor(Math.random() * (1000 - 100 + 1)) + 100
  ).toLocaleString("en-US");

  if (buyWorkerID.ownerID === 1) {
    setCurrentPage("worker");
    setPreviusPage("main");
  }

  return (
    <>
      <div className="buyWorkerPage">
        <div className="workerPageTitle">
          <div className="workerPageAvatarContainer">
            <img className="workerPageAvatar" src={buyWorkerID.avatar} alt="" />
          </div>
          <div className="workerPageName">{buyWorkerID.name}</div>
          <div
            className={
              buyWorkerID.status === "free"
                ? "buyWorkerFree"
                : "buyWorkerWorked"
            }
          >
            {buyWorkerID.status === "free" ? "Свободен" : `Занят на работе`}
          </div>
          <div className="buyWorkerPageBalanceContainer">
            <div className="buyWorkerPageBalance">{balance}</div>
            <div className="buyWorkerPageBalanceSVG">
              <img src="assets/goldMiniCoin.png" alt="" />
            </div>
          </div>
          <div
            className={
              buyWorkerID.status === "free"
                ? "workerUp buy free"
                : "workerUp buy worked"
            }
          >
            <p
              className={
                buyWorkerID.status === "free"
                  ? "workerUpTitle free"
                  : "workerUpTitle worked"
              }
            >
              Купить
            </p>
          </div>
        </div>
        <div className="dottedLine buy"></div>
        <div className="buyWorkerPageProperty">
          <div className="buyWorkerPropertyCard">
            <div className="buyWorkerPropertyCardTitle">
              <div className="buyWorkerPropertyCardName">Доступность:</div>
              <div className="buyWorkerPropertyCardDesc">
                {buyWorkerID.status === "free"
                  ? "Свободен"
                  : `Защита ${shield}`}
              </div>
            </div>
            <div className="buyWorkerPropertyIMG">
              <div className="buyWorkerPropertyIMGContainer">
                <img src="assets/chain.png" alt="" />
              </div>
            </div>
          </div>
          <div className="buyWorkerPropertyCard">
            <div className="buyWorkerPropertyCardTitle">
              <div className="buyWorkerPropertyCardName">Заработано звезд:</div>
              <div className="buyWorkerPropertyCardDesc">{star}</div>
            </div>
            <div className="buyWorkerPropertyIMG">
              <div className="buyWorkerPropertyIMGContainer">
                <img src="assets/star.png" alt="" />
              </div>
            </div>
          </div>
          <div className="buyWorkerPropertyCard">
            <div className="buyWorkerPropertyCardTitle">
              <div className="buyWorkerPropertyCardName">Зарабатывает:</div>
              <div className="buyWorkerPropertyCardDesc">{payment}</div>
            </div>
            <div className="buyWorkerPropertyIMG">
              <div className="buyWorkerPropertyIMGContainer">
                <img src="assets/goldMiniCoin.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BuyWorker;
