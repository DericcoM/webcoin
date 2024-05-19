import React, { useEffect, useRef } from "react";
import "./Rating.css";

function Rating({ setCurrentPage }) {
  const amountPlayer = 6547;
  const remainDate = "18ч";
  const scoreBoardListRef = useRef(null);

  const players = [
    { id: 1, name: "Thomas Vien", balance: 1146500 },
    { id: 2, name: "Thomas Vien", balance: 12412 },
    { id: 3, name: "Thomas Vien", balance: 1215500 },
    { id: 4, name: "Thomas Vien", balance: 1251251 },
    { id: 5, name: "Thomas Vien", balance: 1251 },
    { id: 6, name: "Thomas Vien", balance: 125151 },
    { id: 7, name: "Thomas Vien", balance: 1251257 },
    { id: 8, name: "Thomas Vien", balance: 346734 },
    { id: 9, name: "Thomas Vien", balance: 34563463 },
    { id: 10, name: "Thomas Vien", balance: 34612346 },
    { id: 13, name: "Thomas Vien", balance: 2363463 },
    { id: 14, name: "Thomas Vien", balance: 124515 },
    { id: 15, name: "Thomas Vien", balance: 124515 },
  ];

  const sortedPlayers = [...players].sort((a, b) => b.balance - a.balance);

  const filterBalance = (balance) => balance.toLocaleString("en-US");

  useEffect(() => {
    const handleResize = () => {
      if (scoreBoardListRef.current) {
        const height =
          window.innerHeight -
          scoreBoardListRef.current.getBoundingClientRect().top -
          92;
        scoreBoardListRef.current.style.height = `${height}px`;
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once to set the height initially

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="rating">
        <div className="amountPlayer">{amountPlayer} Игроков</div>
        <div className="ratingBackground">
          <div className="rectangle"></div>
          <div className="ratingKubokContainer">
            <img src="assets/bigKubok.png" alt="" />
          </div>
        </div>
        <div className="scoreBoard">
          <div className="scoreBoardTitle">День</div>
          <div className="remainDate">Осталось {remainDate}</div>
          <div className="line"></div>
          <div className="scoreBoardList" ref={scoreBoardListRef}>
            {sortedPlayers.map((player, index) => (
              <div key={player.id} className="ratingPlayerCard">
                {index < 3 ? (
                  <div className="ratingPlayerCardIMG">
                    <img
                      src={`assets/${index + 1}.png`}
                      alt={`Место ${index + 1}`}
                    />
                  </div>
                ) : (
                  <div className="scorePosition">{index + 1}</div>
                )}
                <div className="ratingAvatar">
                  <img src="assets/worker.png" alt="" />
                </div>
                <div className="ratingDesc">
                  <div className="ratingWorkerName">{player.name}</div>
                  <div className="ratingWorkerBalance">
                    <div className="ratingWorkerBalanceIMG">
                      <img src="assets/goldMiniCoin.png" alt="" />
                    </div>
                    {filterBalance(player.balance)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="ownerPos">
          <div className="ownerPosLeft">
            <div className="scorePosition">6,4K</div>
            <div className="ratingAvatar">
              <img src="assets/worker1.png" alt="" />
            </div>
            <div className="ratingDesc">
              <div className="ratingWorkerName">Thomas Vien</div>
              <div className="ratingWorkerBalance">
                <div className="ratingWorkerBalanceIMG">
                  <img src="assets/goldMiniCoin.png" alt="" />
                </div>
                {filterBalance(76555)}
              </div>
            </div>
          </div>
          <div className="ownerPosYou">You</div>
        </div>
      </div>
    </>
  );
}

export default Rating;
