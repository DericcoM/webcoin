import React, { useState } from "react";
import "./WorkerPage.css";

function WorkerPage({ workerID }) {
  return (
    <>
      <div className="workerPage">
        <div className="workerPageTitle">
          <div className="workerPageAvatarContainer">
            <img className="workerPageAvatar" src="assets/worker.png" alt="" />
          </div>
          <div className="workerPageName">George S.</div>
          <div className="workerPageStatus">Работает на вас</div>
        </div>
        <div className="workerPageStatusBar">
          <div className="workerPageShield">Защищен на 6ч. 47мин.</div>
          <div className="workerPagePayment">1,000/min</div>
        </div>
        <div className="dottedLine"></div>
        <div className="workerUp">
          <p className="workerUpTitle">Прокачать за N</p>
          <div className="workerUpCoin">
            <img src="assets/goldMiniCoin.png" alt="" />
          </div>
        </div>
        <div className="workerUp">
          <p className="workerUpTitle">Защитить за N</p>
          <div className="workerUpCoin">
            <img src="assets/goldMiniCoin.png" alt="" />
          </div>
          <p className="workerUpTitle">на 8 часов</p>
        </div>
        <div className="workerPlayers">
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
        </div>
      </div>
    </>
  );
}

export default WorkerPage;
