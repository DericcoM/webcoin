import React from "react";
import "./WorkerBuy.css";
import useFetchUserData from "../../Hooks/useFetchUserData";
function WorkerBuy({
  id,
  name,
  status,
  owner,
  ownerID,
  avatar,
  price,
  setCurrentPage,
  setBuyWorkerID,
  player,
  setPreviousPage,
}) {
  const { userData, loading, error } = useFetchUserData(ownerID);

  if (loading) {
    return;
  }

  if (error) {
    return <div>Error loading user data: {error.message}</div>;
  }

  const statusBar = () => {
    if (status === "worked") {
      return (
        <div
          className={
            ownerID === 1 ? "workerBuyStatusWorkedYou" : "workerBuyStatusWorked"
          }
        >
          {ownerID === 1 ? "Работает на вас" : `Работает на ${owner}`}
        </div>
      );
    }
    if (status === "free") {
      return <div className="workerBuyStatusFree">Свободен</div>;
    }
    return null; // Default case
  };

  const formatPrice = (price) => {
    if (price >= 1000000) {
      // Округляем до сотен тысяч и форматируем
      return `${(price / 1000000).toFixed(1)} млн`;
    }
    return price.toLocaleString("en-US"); // Используем русскую локаль для форматирования
  };

  const formattedPrice = formatPrice(price);
  console.log(id);
  return (
    <div
      className="workerBuyCard"
      onClick={() => {
        setCurrentPage("buyWorker");
        setPreviousPage("buy");
        setBuyWorkerID(id);
      }}
    >
      <div className="workerBuyCardTitle">
        <div className="workerBuyCardImg">
          <img src={avatar} alt="" className="workerBuyAvatar" />
        </div>
        <div className="workerBuyCardInfo">
          <div className="workerBuyName">{name}</div>
          <div className="workerBuyStatusWorked">
            Работает на {userData.user_fullname}
          </div>
        </div>
      </div>
      <div className="workerBuyDetailsContainer">
        <div className="workerBuyDetails">
          <div className="workerBuyPrice">{formattedPrice}</div>
          <div className="workerBuyPriceCoinContainer">
            <img
              className="workerBuyPriceCoin"
              src="assets/goldMiniCoin.png"
              alt=""
            />
          </div>
        </div>
        <div className="workerBuyPriceSVG">
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
            <path
              d="M0.959736 14.2929C0.569212 14.6834 0.569212 15.3166 0.959737 15.7071C1.35026 16.0976 1.98343 16.0976 2.37395 15.7071L0.959736 14.2929ZM2.37395 0.292891C1.98342 -0.0976329 1.35026 -0.0976329 0.959735 0.292891C0.569211 0.683416 0.569211 1.31658 0.959735 1.7071L2.37395 0.292891ZM2.37395 15.7071L8.54899 9.53206L7.13478 8.11785L0.959736 14.2929L2.37395 15.7071ZM8.54899 6.46793L2.37395 0.292891L0.959735 1.7071L7.13478 7.88215L8.54899 6.46793ZM8.54899 9.53206C9.39513 8.68593 9.39513 7.31407 8.54899 6.46793L7.13478 7.88215C7.19986 7.94723 7.19986 8.05276 7.13478 8.11785L8.54899 9.53206Z"
              fill="#4F4F4F"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default WorkerBuy;
