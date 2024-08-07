import React, { useState, useEffect } from "react";
import "./BuyWorker.css";
import useFetchUserData from "../../Hooks/useFetchUserData";
import { buyWorker } from "../../api/api";

function BuyWorker({
  buyWorkerID,
  setCurrentPage,
  setPreviousPage,
  ownerID,
  userID,
  handleUpdateBalance,
  lang,
}) {
  const { userData, loading, error, refetchUserData } =
    useFetchUserData(buyWorkerID);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!loading && !error) {
      setModalOpen(false); // Close modal when data is updated
    }
  }, [loading, error]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user data: {error.message}</div>;
  }

  const handleBuy = async () => {
    try {
      await buyWorker(userID, buyWorkerID);
      refetchUserData(); // Update user data
      // Transition to the main page after updates
      handleUpdateBalance();
      setCurrentPage("main");
      setPreviousPage("main");
    } catch (error) {
      handleModalError(error);
    }
  };

  const handleBuyNo = () => {};

  const handleModalError = (error) => {
    let errorMessageToShow =
      lang.lang === "ru" ? "Ошибка" : "An error has occurred";
    if (error.response && error.response.data && error.response.data.error) {
      if (error.response.status === 400) {
        errorMessageToShow =
          lang.lang === "ru" ? "Недостаточно монет" : "Insufficient funds";
      } else {
        errorMessageToShow = error.response.data.error;
      }
    } else if (error.message) {
      errorMessageToShow = error.message;
    }
    setErrorMessage(errorMessageToShow);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleBack = () => {
    setPreviousPage("main"); // Установка предыдущей страницы
    setCurrentPage("buy");
  };

  return (
    <>
      <div className="buyWorkerPage">
        <div className="workerPageTitle">
          <div className="workerPageAvatarContainer">
            <img className="workerPageAvatar" src={userData.img} alt="" />
          </div>
          <div className="workerPageName">{userData.username}</div>
          <div className="buyWorkerWorked">
            {lang.lang === "ru" ? "Занят на работе" : "Busy at work"}
          </div>
          <div className="buyWorkerPageBalanceContainer">
            <div className="buyWorkerPageBalance">{userData.price}</div>
            <div className="buyWorkerPageBalanceSVG">
              <img src="assets/goldMiniCoin.png" alt="" />
            </div>
          </div>
          <div
            className={
              userData.is_safe === "no"
                ? "workerUp buy free"
                : "workerUp buy worked"
            }
            onClick={userData.is_safe === "no" ? handleBuy : handleBuyNo}
          >
            <p
              className={
                userData.is_safe === "no"
                  ? "workerUpTitle free"
                  : "workerUpTitle worked"
              }
            >
              {lang.lang === "ru" ? "Купить" : "Buy"}
            </p>
          </div>
        </div>
        <div className="dottedLine buy"></div>
        <div className="buyWorkerPageProperty">
          <div className="buyWorkerPropertyCard">
            <div className="buyWorkerPropertyCardTitle">
              <div className="buyWorkerPropertyCardName">
                {lang.lang === "ru" ? "Доступность:" : "Availability:"}
              </div>
              <div className="buyWorkerPropertyCardDesc">
                {userData.is_safe === "no"
                  ? lang.lang === "ru"
                    ? "Свободно"
                    : "Free"
                  : lang.lang === "ru"
                  ? "Защищено"
                  : "Protected"}
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
              <div className="buyWorkerPropertyCardName">{lang.lang === "ru" ? "Заработано звезд" : "Earned stars:"}</div>
              <div className="buyWorkerPropertyCardDesc">{userData.stars}</div>
            </div>
            <div className="buyWorkerPropertyIMG">
              <div className="buyWorkerPropertyIMGContainer">
                <img src="assets/star.png" alt="" />
              </div>
            </div>
          </div>
          <div className="buyWorkerPropertyCard">
            <div className="buyWorkerPropertyCardTitle">
              <div className="buyWorkerPropertyCardName">{lang.lang === "ru" ? "Зарабатывает" : "Earns:"}</div>
              <div className="buyWorkerPropertyCardDesc">
                {userData.sum_income}/{lang.lang === "ru" ? "мин" : "min"}
              </div>
            </div>
            <div className="buyWorkerPropertyIMG">
              <div className="buyWorkerPropertyIMGContainer">
                <img src="assets/goldMiniCoin.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {modalOpen && (
        <div className="modal">
          <div className="backdrop" onClick={handleModalClose}></div>
          <div className="error-message">
            {errorMessage}
            <div className="error-msg">{lang.lang === "ru" ? "Попробуйте позже" : "Try again later"}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default BuyWorker;
