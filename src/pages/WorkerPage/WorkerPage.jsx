import React, { useState, useEffect } from "react";
import "./WorkerPage.css";
import useFetchUserData from "../../Hooks/useFetchUserData";
import useFetchUserWorker from "../../Hooks/useFetchUserWorker";
import { fetchWorkerUp, fetchWorkerShield } from "../../api/api";

function WorkerPage({ userID, workerID, setPreviousPage }) {
  const { userData, loading, error, refetchUserData } =
    useFetchUserData(workerID);
  const { userWorker, loadingWorker, errorWorker } =
    useFetchUserWorker(workerID);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  setPreviousPage("main");
  useEffect(() => {
    if (!loading && !error) {
      setModalOpen(false); // Закрыть модальное окно при обновлении данных
    }
  }, [loading, error]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user data: {error.message}</div>;
  }

  const handleUp = async () => {
    try {
      const response = await fetchWorkerUp(userID, workerID);
      // После успешного выполнения запроса обновляем данные о пользователе
      refetchUserData();
    } catch (error) {
      handleModalError(error);
    }
  };

  const handleShield = async () => {
    try {
      const response = await fetchWorkerShield(userID, workerID);
      // После успешного выполнения запроса обновляем данные о пользователе
      refetchUserData();
    } catch (error) {
      handleModalError(error);
    }
  };

  const handleModalError = (error) => {
    let errorMessageToShow = "Произошла ошибка";
    if (error.response && error.response.data && error.response.data.error) {
      if (error.response.status === 400) {
        errorMessageToShow = "Недостаточно средств";
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

  const handleSheildNo = () => {};
  return (
    <>
      <div className="workerPage">
        <div className="workerPageTitle">
          <div className="workerPageAvatarContainer">
            <img className="workerPageAvatar" src={userData.img} alt="" />
          </div>
          <div className="workerPageName">{userData.user_fullname}</div>
          <div className="workerPageStatus">Работает на вас</div>
        </div>
        <div className="workerPageStatusBar">
          <div className="workerPageShield">
            {userData.is_safe === "yes" ? "Защищен" : "Не защищен"}
          </div>
          <div className="workerPagePayment">{userData.income}/min</div>
        </div>
        <div className="dottedLine"></div>
        <div
          className={
            userData.is_safe === "yes" ? "workerUp yes" : "workerUp no"
          }
          onClick={handleUp}
        >
          <p className="workerUpTitle">Прокачать за {userData.level_price}</p>
          <div className="workerUpCoin">
            <img src="assets/goldMiniCoin.png" alt="" />
          </div>
        </div>
        <div
          className="workerUp"
          onClick={userData.is_safe === "no" ? handleShield : handleSheildNo}
        >
          <p
            className={
              userData.is_safe === "yes"
                ? "workerUpTitle yes"
                : "workerUpTitle no"
            }
          >
            Защитить за {userData.shield_price}
          </p>
          <div className="workerUpCoin">
            <img src="assets/goldMiniCoin.png" alt="" />
          </div>
          <p
            className={
              userData.is_safe === "yes"
                ? "workerUpTitle yes"
                : "workerUpTitle no"
            }
          >
            на 8 часов
          </p>
        </div>
        <div className="workerPlayers">
          <div className="workerPlayersUnit">
            <div className="workerPlayersUnitGroup">
              <div className="workerPlayersUnitPoint">C:</div>
              <div className="workerPlayersUnitCount">N чел.</div>
            </div>
          </div>
          <div className="workerPlayersUnit">
            <div className="workerPlayersUnitGroup">
              <div className="workerPlayersUnitPoint">D:</div>
              <div className="workerPlayersUnitCount">N чел.</div>
            </div>
          </div>
          <div className="workerPlayersUnit">
            <div className="workerPlayersUnitGroup">
              <div className="workerPlayersUnitPoint">E:</div>
              <div className="workerPlayersUnitCount">N чел.</div>
            </div>
          </div>
          <div className="workerPlayersUnit">
            <div className="workerPlayersUnitGroup">
              <div className="workerPlayersUnitPoint">F:</div>
              <div className="workerPlayersUnitCount">N чел.</div>
            </div>
          </div>
          <div className="workerPlayersUnit">
            <div className="workerPlayersUnitGroup">
              <div className="workerPlayersUnitPoint">G:</div>
              <div className="workerPlayersUnitCount">N чел.</div>
            </div>
          </div>
        </div>
      </div>
      {modalOpen && (
        <div className="modal">
          <div className="backdrop" onClick={handleModalClose}></div>
          <div className="error-message">{errorMessage}</div>
        </div>
      )}
    </>
  );
}

export default WorkerPage;
