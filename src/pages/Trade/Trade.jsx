import React, { useRef, useEffect, useState } from "react";
import "./Trade.css";
import { fetchRefersOwner } from "../../api/api";
import axios from "axios";

function Trade({ setCurrentPage, stars, userId, setPreviousPage, lang }) {
  const buyScrollRef = useRef(null);
  const [data, setData] = useState({});
  const [tradeAmount, setTradeAmount] = useState(""); // State to store the trade amount
  const [curs, setCurs] = useState("");
  const [tradeStars, setTradeStars] = useState(stars);

  const adjustMainScrollHeight = () => {
    if (buyScrollRef.current) {
      const windowHeight = window.innerHeight;
      const footerHeight = 80; // Height of the footer
      const maxScrollHeight = windowHeight - footerHeight - 35; // 35 pixels from the bottom
      buyScrollRef.current.style.maxHeight = `${maxScrollHeight}px`;
    }
  };

  const handleRefers = async () => {
    try {
      console.log("userIdTrade", userId);
      const response = await fetchRefersOwner(userId);
      setData(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getCurs = async () => {
    try {
      const tradeUrl = `https://aylsetalinad.ru/api/star_value`;
      const response = await axios.get(tradeUrl);
      setCurs(response.data);
      // Update stars or other state based on the response if necessary
    } catch (error) {
      console.error("Error trading stars:", error);
    }
  };

  useEffect(() => {
    getCurs();
    adjustMainScrollHeight();
    window.addEventListener("resize", adjustMainScrollHeight);
    handleRefers();
    return () => {
      window.removeEventListener("resize", adjustMainScrollHeight);
    };
  }, []);

  const handleTrade = async () => {
    try {
      const tradeUrl = `https://aylsetalinad.ru/api/trade/${userId}/${tradeAmount}`;
      const response = await axios.get(tradeUrl);
      console.log(response.data);
      if (response.status === 200) {
        setTradeStars(tradeStars - tradeAmount);
      }
    } catch (error) {
      console.error("Error trading stars:", error);
    }
  };

  return (
    <>
      <div className="trade">
        <div className="buyScrollContainer" ref={buyScrollRef}>
          <div className="boostTitle">{lang.lang === "ru" ? "Баланс" : "Balance"}</div>

          <div className="balanceValue">
            {tradeStars}
            <div className="balanceValueImg">
              <img src="assets/star.png" alt="star" />
            </div>
          </div>
          <div className="curs">{lang.lang === "ru" ? `1 звезда = ${curs} монет` : `1 stars = ${curs} coins`}</div>
          <div className="statistics">{lang.lang === "ru" ? "Статистика:" : "Stats:"}</div>
          <div className="workerPlayersUnit">
            <div className="workerPlayersUnitGroup">
              <div className="workerPlayersUnitPoint">B:</div>
              <div className="workerPlayersUnitCount">{data.b_refs} {lang.lang === "ru" ? "реф." : "refs."}</div>
            </div>
          </div>
          <div className="workerPlayersUnit">
            <div className="workerPlayersUnitGroup">
              <div className="workerPlayersUnitPoint">C:</div>
              <div className="workerPlayersUnitCount">{data.c_refs} {lang.lang === "ru" ? "реф." : "refs."}</div>
            </div>
          </div>
          <div className="workerPlayersUnit">
            <div className="workerPlayersUnitGroup">
              <div className="workerPlayersUnitPoint">D:</div>
              <div className="workerPlayersUnitCount">{data.d_refs} {lang.lang === "ru" ? "реф." : "refs."}</div>
            </div>
          </div>
          <div className="workerPlayersUnit">
            <div className="workerPlayersUnitGroup">
              <div className="workerPlayersUnitPoint">E:</div>
              <div className="workerPlayersUnitCount">{data.e_refs} {lang.lang === "ru" ? "реф." : "refs."}</div>
            </div>
          </div>
          <div className="workerPlayersUnit">
            <div className="workerPlayersUnitGroup">
              <div className="workerPlayersUnitPoint">F:</div>
              <div className="workerPlayersUnitCount">{data.f_refs} {lang.lang === "ru" ? "реф." : "refs."}</div>
            </div>
          </div>
          <div className="workerPlayersUnit">
            <div className="workerPlayersUnitGroup">
              <div className="workerPlayersUnitPoint">G:</div>
              <div className="workerPlayersUnitCount">{data.g_refs} {lang.lang === "ru" ? "реф." : "refs."}</div>
            </div>
          </div>
          <div className="tradeForm">
            <div className="workerPlayersUnit trade">
              <input
                className="input"
                placeholder={lang.lang === "ru" ? "Обменять звезды" : "Trade stars"}
                type="number"
                max={tradeStars} // Specify the maximum value here
                value={tradeAmount} // Bind input value to state
                onChange={(e) => {
                  const max = tradeStars;
                  if (e.target.value > max) {
                    e.target.value = max;
                  }
                  setTradeAmount(e.target.value); // Update trade amount state
                }}
              />
            </div>
            <div className="workerUp buy free" onClick={handleTrade}>
              <p className="workerUpTitle free">{lang.lang === "ru" ? "Обменять" : "Trade"}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Trade;
