import React, { useEffect, useState, useRef } from "react";
import "./Rating.css";

function Rating({ setCurrentPage, mainID, mainData, lang, skin }) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const scoreBoardListRef = useRef(null);
  const [amountPlayer, setAmountPlayer] = useState("");

  const playerCardHeight = 63; // Height of each player card in px
  const ownerPosHeight = 91; // Height of the owner position element in px

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

  const remainDate = hoursUntilMidnightInMoscow();

  const fetchData = async (retryDelay = 1000) => {
    try {
      const response = await fetch("https://aylsetalinad.ru/api/get_rating");
      const data = await response.json();

      // Sort the data by rating in ascending order
      const sortedData = data.sort((a, b) => a.rating - b.rating);

      setPlayers(sortedData);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch players, retrying in", retryDelay, "ms");
      setTimeout(() => fetchData(retryDelay), retryDelay);
    }
  };

  const fetchAllPlayers = async (retryDelay = 1000) => {
    try {
      const response = await fetch(
        "https://aylsetalinad.ru/api/get_user_count"
      );
      const data = await response.json();
      setAmountPlayer(data);
      setLoading(false);
    } catch (error) {
      console.error(
        "Failed to fetch player count, retrying in",
        retryDelay,
        "ms"
      );
      setTimeout(() => fetchAllPlayers(retryDelay), retryDelay);
    }
  };

  useEffect(() => {
    fetchData();
    fetchAllPlayers();
  }, []);

  useEffect(() => {
    if (scoreBoardListRef.current) {
      scrollToTop();
    }
  }, [players]);

  const scrollToTop = () => {
    if (scoreBoardListRef.current) {
      scoreBoardListRef.current.scrollTop = 0;
    }
  };

  const filterBalance = (balance) => balance.toLocaleString("en-US");

  const updateScoreBoardHeight = () => {
    if (scoreBoardListRef.current) {
      const windowHeight = window.innerHeight;
      const topPosition = scoreBoardListRef.current.getBoundingClientRect().top;
      const remainingSpace = windowHeight - topPosition - ownerPosHeight; // Adjusted for owner position height
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

  const userPosition = players.findIndex((player) => player.id === mainData.id);
  const displayPosition = userPosition !== -1 ? `${userPosition + 1}` : `${mainData.rating}`;

  return (
    <div className="rating">
      <div className="amountPlayer">
        {amountPlayer} {lang.lang === "ru" ? "Игроков" : "Players"}
      </div>
      <div className="ratingBackground">
        <div className="rectangle"></div>
        <div className="ratingKubokContainer">
          <img src="assets/kubokStars.png" alt="" />
        </div>
        <div className="scoreBoard">
          <div className="scoreBoardTitle">
            <div className="pull">
              1000
              <div className="balanceValueImg rating">
                <img src="assets/star.png" alt="" />
              </div>
            </div>
            {lang.lang === "ru" ? "День" : "Day"}
          </div>
          <div className="remainDate">{remainDate} {lang.lang === "ru" ? "часов осталось" : "hours left"}</div>
          <div className="line"></div>
          <div className="scoreBoardList" ref={scoreBoardListRef}>
            {players.map((player, index) => (
              <div key={player.id} className="ratingPlayerCard">
                {index < 3 ? (
                  <div className="ratingPlayerCardIMG">
                    <img
                      src={`assets/${index + 1}.png`}
                      alt={`${index + 1}`}
                    />
                  </div>
                ) : (
                  <div className="scorePosition">{index + 1}</div>
                )}
                <div className="ratingAvatar">
                  <img src={player.img || "assets/worker.png"} alt="" />
                </div>
                <div className="ratingDesc">
                  <div className="ratingWorkerName">
                    {player.username
                      ? player.username.length > 12
                        ? `${player.username.slice(0, 12)}...`
                        : player.username
                      : "username"}
                  </div>
                  <div className="ratingWorkerBalance">
                    <div className="ratingWorkerBalanceIMG">
                      <img
                        src={`assets/skins/${player.icon_coin}.png`}
                        alt=""
                      />
                    </div>
                    {filterBalance(player.earned)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="ownerPos">
            <div className="ownerPosLeft">
              {userPosition < 3 && userPosition !== -1 ? (
                <div className="ratingPlayerCardIMG">
                  <img
                    src={`assets/${userPosition + 1}.png`}
                    alt={`Место ${userPosition + 1}`}
                  />
                </div>
              ) : (
                <div className="scorePosition">{displayPosition}</div>
              )}
              <div className="ratingAvatar">
                <img src={mainData.img} alt="" />
              </div>
              <div className="ratingDesc">
                <div className="ratingWorkerName">
                  {mainData.username
                    ? mainData.username.length > 12
                      ? `${mainData.username.slice(0, 12)}...`
                      : mainData.username
                    : "username"}
                </div>
                <div className="ratingWorkerBalance">
                  <div className="ratingWorkerBalanceIMG">
                    <img
                      src={`assets/skins/${skin}.png`}
                      alt=""
                    />
                  </div>
                  {filterBalance(mainData.earned)}
                </div>
              </div>
            </div>
            <div className="ownerPosYou">{lang.lang === "ru" ? "Ты" : "You"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rating;
