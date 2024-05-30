import React, { useEffect, useState, useRef } from "react";
import "./Rating.css";

function Rating({ setCurrentPage, mainID, mainData }) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const scoreBoardListRef = useRef(null);

  const amountPlayer = players.length;

  const playerCardHeight = 63; // Height of each player card in px

  function hoursUntilMidnightInMoscow() {
    const now = new Date(); // Current local time
    const msUntilMidnight =
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // Next day
        0, // Hours
        0, // Minutes
        0 // Seconds
      ).getTime() - now.getTime(); // Difference in milliseconds until midnight

    const hoursUntilMidnight = Math.floor(msUntilMidnight / (1000 * 60 * 60)); // Convert milliseconds to hours and add Moscow time offset

    return hoursUntilMidnight;
  }

  const remainDate = hoursUntilMidnightInMoscow() + "ч";
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
      const windowHeight = window.innerHeight;
      const topPosition = scoreBoardListRef.current.getBoundingClientRect().top;
      const remainingSpace = windowHeight - topPosition;
      const maxVisiblePlayers = Math.floor(remainingSpace / playerCardHeight);
      const finalHeight = maxVisiblePlayers * playerCardHeight;
      scoreBoardListRef.current.style.height = `${finalHeight}px`;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateScoreBoardHeight);
    updateScoreBoardHeight(); // Call once to set the height initially

    return () => window.removeEventListener("resize", updateScoreBoardHeight);
  }, [players]);

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
          <img src="assets/kubokStars.png" alt="" />
        </div>
        <div className="scoreBoard">
          <div className="scoreBoardTitle">
            <div className="pull">
              100
              <div className="balanceValueImg rating">
                <img src="assets/star.png" alt="" />
              </div>
            </div>
            День
          </div>
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
      </div>
    </div>
  );
}

export default Rating;
