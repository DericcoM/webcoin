import React, { useState, useEffect } from "react";
import "./WorkerPage.css";
import useFetchUserData from "../../Hooks/useFetchUserData";
import useFetchUserWorker from "../../Hooks/useFetchUserWorker";
import useSafeTimer from "../../Hooks/useSafeTimer";
import {
  fetchWorkerUp,
  fetchWorkerShield,
  fetchSafeTimer,
} from "../../api/api";

function WorkerPage({ userID, workerID, setPreviousPage, balance }) {
  const { userData, loading, error, refetchUserData } =
    useFetchUserData(workerID);
  const { userWorker, loadingWorker, errorWorker } =
    useFetchUserWorker(workerID);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [timer, setTimer] = useState();

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
        errorMessageToShow = "Недостаточно средств.";
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
            {userData.is_safe === "yes"
              ? `Защищен ${userData.timer}`
              : "Не защищен"}
          </div>
          <div className="workerPagePayment">{userData.income}/min</div>
        </div>
        <div className="dottedLine"></div>
        <div className={"workerUp"}>
          <p className="workerUpTitle">
            Зарабатывает {userData.sum_income}/мин
          </p>
        </div>

        <div className="workerPlayers">
          <div className="workerPlayersUnit">
            <div className="workerPlayersUnitGroup">
              <div className="workerPlayersUnitPoint">C:</div>
              <div className="workerPlayersUnitCount">N чел.</div>
            </div>
            <div className="workerPlayersUnit_Income">+4/min</div>
          </div>
          <div className="workerPlayersUnit">
            <div className="workerPlayersUnitGroup">
              <div className="workerPlayersUnitPoint">D:</div>
              <div className="workerPlayersUnitCount">N чел.</div>
            </div>
            <div className="workerPlayersUnit_Income">+8/min</div>
          </div>
          <div className="workerPlayersUnit">
            <div className="workerPlayersUnitGroup">
              <div className="workerPlayersUnitPoint">E:</div>
              <div className="workerPlayersUnitCount">N чел.</div>
            </div>
            <div className="workerPlayersUnit_Income">+12/min</div>
          </div>
          <div className="workerPlayersUnit">
            <div className="workerPlayersUnitGroup">
              <div className="workerPlayersUnitPoint">F:</div>
              <div className="workerPlayersUnitCount">N чел.</div>
            </div>
            <div className="workerPlayersUnit_Income">+16/min</div>
          </div>
          <div className="workerPlayersUnit">
            <div className="workerPlayersUnitGroup">
              <div className="workerPlayersUnitPoint">G:</div>
              <div className="workerPlayersUnitCount">N чел.</div>
            </div>
            <div className="workerPlayersUnit_Income">+20/min</div>
          </div>
        </div>
        <div
          className={
            balance >= userData.level_price ? "workerUp yes balance" : "workerUp no"
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

export default WorkerPage;
