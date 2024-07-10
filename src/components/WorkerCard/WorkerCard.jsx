import React, { useEffect, useState } from "react";
import "./WorkerCard.css";

function WorkerCard({
  userData,
  setCurrentPage,
  setWorkerID,
  setPreviousPage,
  handleQr,
  handleCopy,
  sharedText,
  lang,
}) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (userData && userData.length > 0) {
      const sortedWorkers = userData.flat().sort((a, b) => a.price - b.price);
      setPlayers(sortedWorkers);
    }
  }, [userData]);

  const chunkedPlayers = players.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 3);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);

  if (!players || players.length === 0) {
    return (
      <div className="workers">
        <div className="noWorkersContainer">
          <div className="bigDoubleCoin">
            <img
              className="bigDoubleCoinImage"
              src="assets/bigDoubleCoin.png"
              alt=""
            />
          </div>
          <div className="noWorkersText">
            <div className="noWorkersTitle">
              {lang.lang === "ru"
                ? "У вас нет работников."
                : "You don't have any workres."}
            </div>
            <div className="noWorkersButtons">
              <div className="noWorkerButton" onClick={handleQr}>
                <div className="noWorkerButtonContainer">
                  <div className="mainRefQrSVG"></div>
                </div>
              </div>
              <a href={sharedText} className="noWorkerButton">
                <div className="noWorkerButtonContainer">
                  <div className="mainRefShareSVG"></div>
                </div>
              </a>
            </div>
            <div className="noWorkersSubTittle">
              {lang.lang === "ru"
                ? "Пригласи друзей по реферальной ссылке, чтобы начать зарабатывать."
                : "Invite your friends via the referral link to start earning money."}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="workers">
      {chunkedPlayers.map((chunk, index) => (
        <div key={index} className="workerRow">
          {chunk.map((worker, idx) => (
            <div
              key={`${worker.id}_${idx}`}
              className="workerCard"
              onClick={() => {
                setCurrentPage("worker");
                console.log(worker.user_id);
                setWorkerID(worker.user_id);
                setPreviousPage("main");
              }}
            >
              <div className="workerAvatar">
                <img className="workerAvatarIMG" src={worker.img} alt="" />
              </div>
              <div className="workerName">
                {worker.username
                  ? worker.username.length > 12
                    ? `${worker.username.slice(0, 12)}...`
                    : worker.username
                  : "username"}
              </div>

              <div className="workerPrice">
                {worker.sum_ref_income}
                {lang.lang === "ru" ? "/мин" : "/min"}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default WorkerCard;
