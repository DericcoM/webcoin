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
    let errorMessageToShow = "An error has occurred";
    if (error.response && error.response.data && error.response.data.error) {
      if (error.response.status === 400) {
        errorMessageToShow = "Insufficient funds";
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

  return (
    <>
      <div className="buyWorkerPage">
        <div className="workerPageTitle">
          <div className="workerPageAvatarContainer">
            <img className="workerPageAvatar" src={userData.img} alt="" />
          </div>
          <div className="workerPageName">{userData.username}</div>
          <div className="buyWorkerWorked">Busy at work</div>
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
              Buy
            </p>
          </div>
        </div>
        <div className="dottedLine buy"></div>
        <div className="buyWorkerPageProperty">
          <div className="buyWorkerPropertyCard">
            <div className="buyWorkerPropertyCardTitle">
              <div className="buyWorkerPropertyCardName">Availability:</div>
              <div className="buyWorkerPropertyCardDesc">
                {userData.is_safe === "no" ? "Free" : `Protected`}
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
              <div className="buyWorkerPropertyCardName">Earned stars:</div>
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
              <div className="buyWorkerPropertyCardName">Earns:</div>
              <div className="buyWorkerPropertyCardDesc">
                {userData.sum_income}/min
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
            <div className="error-msg">Попробуйте позже</div>
          </div>
        </div>
      )}
    </>
  );
}

export default BuyWorker;
