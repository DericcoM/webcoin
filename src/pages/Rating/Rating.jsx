import React, { useEffect, useState, useRef } from "react";
import "./Rating.css";

function Rating({ setCurrentPage, mainID, mainData }) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const scoreBoardListRef = useRef(null);

  const amountPlayer = players.length;
  const remainDate = "18ч";
  const playerCardHeight = 63; // Height of each player card in px

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://ammolin.ru/api/get_rating");
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sortedPlayers = [...players].sort((a, b) => b.balance - a.balance);

  const filterBalance = (balance) => balance.toLocaleString("en-US");

  const updateScoreBoardHeight = () => {
    if (scoreBoardListRef.current) {
      const height =
        window.innerHeight -
        scoreBoardListRef.current.getBoundingClientRect().top -
        92;
      const totalHeight = sortedPlayers.length * playerCardHeight;
      const finalHeight = Math.min(totalHeight, height);
      scoreBoardListRef.current.style.height = `${finalHeight}px`;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateScoreBoardHeight);
    updateScoreBoardHeight(); // Call once to set the height initially

    return () => window.removeEventListener("resize", updateScoreBoardHeight);
  }, [sortedPlayers]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const userPosition = sortedPlayers.findIndex(
    (player) => player.id === mainData.id
  );

  return (
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
        <div
          className="scoreBoardList"
          ref={scoreBoardListRef}
        >
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
                <img src={player.img || "assets/worker.png"} alt="" />
              </div>
              <div className="ratingDesc">
                <div className="ratingWorkerName">{player.user_fullname}</div>
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
          <div className="scorePosition">{userPosition + 1}</div>
          <div className="ratingAvatar">
            <img src={mainData.img} alt="" />
          </div>
          <div className="ratingDesc">
            <div className="ratingWorkerName">{mainData.user_fullname}</div>
            <div className="ratingWorkerBalance">
              <div className="ratingWorkerBalanceIMG">
                <img src="assets/goldMiniCoin.png" alt="" />
              </div>
              {filterBalance(mainData.balance)}
            </div>
          </div>
        </div>
        <div className="ownerPosYou">You</div>
      </div>
    </div>
  );
}

export default Rating;
