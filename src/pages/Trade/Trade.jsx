import React, { useRef, useEffect, useState } from "react";
import "./Trade.css";
import { fetchRefersOwner } from "../../api/api";

function Trade({ setCurrentPage, stars, userId, setPreviousPage }) {
  const buyScrollRef = useRef(null);
  const [data, setData] = useState({});
  const [iframeVisible, setIframeVisible] = useState(false);
  const [iframeUrl, setIframeUrl] = useState("");
  const adjustMainScrollHeight = () => {
    if (buyScrollRef.current) {
      const windowHeight = window.innerHeight;
      const footerHeight = 80; // Высота подвала
      const maxScrollHeight = windowHeight - footerHeight - 35; // 100 пикселей от низа
      buyScrollRef.current.style.maxHeight = `${maxScrollHeight}px`;
    }
  };

  const handleRefers = async () => {
    try {
      const response = await fetchRefersOwner(userId);
      setData(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    adjustMainScrollHeight();
    window.addEventListener("resize", adjustMainScrollHeight);
    handleRefers();
    return () => {
      window.removeEventListener("resize", adjustMainScrollHeight);
    };
  }, []);

  const openIframe = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      <div className="trade">
        <div className="buyScrollContainer" ref={buyScrollRef}>
          <div className="boostTitle">Баланс</div>

          <div className="balanceValue">
            {stars}
            <div className="balanceValueImg">
              <img src="assets/star.png" alt="" />
            </div>
          </div>
          <div className="statistics">Статистика:</div>
          <div className="workerPlayersUnit">
            <div className="workerPlayersUnitGroup">
              <div className="workerPlayersUnitPoint">B:</div>
              <div className="workerPlayersUnitCount">{data.b_refs} чел.</div>
            </div>
          </div>
          <div className="workerPlayersUnit">
            <div className="workerPlayersUnitGroup">
              <div className="workerPlayersUnitPoint">C:</div>
              <div className="workerPlayersUnitCount">{data.c_refs} чел.</div>
            </div>
          </div>
          <div className="workerPlayersUnit">
            <div className="workerPlayersUnitGroup">
              <div className="workerPlayersUnitPoint">D:</div>
              <div className="workerPlayersUnitCount">{data.d_refs} чел.</div>
            </div>
          </div>
          <div className="workerPlayersUnit">
            <div className="workerPlayersUnitGroup">
              <div className="workerPlayersUnitPoint">E:</div>
              <div className="workerPlayersUnitCount">{data.e_refs} чел.</div>
            </div>
          </div>
          <div className="workerPlayersUnit">
            <div className="workerPlayersUnitGroup">
              <div className="workerPlayersUnitPoint">F:</div>
              <div className="workerPlayersUnitCount">{data.f_refs} чел.</div>
            </div>
          </div>
          <div className="workerPlayersUnit">
            <div className="workerPlayersUnitGroup">
              <div className="workerPlayersUnitPoint">G:</div>
              <div className="workerPlayersUnitCount">{data.g_refs} чел.</div>
            </div>
          </div>
          <div className={"workerUp buy free"}>
            <p className={"workerUpTitle free"}>Обменять</p>
          </div>
          <a
            href="#"
            onClick={() => openIframe("https://tvoycoin.com/bonus")}
            className="convention"
          >
            Правила участия в бонусной программе
          </a>
        </div>
      </div>
    </>
  );
}

export default Trade;
