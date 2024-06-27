import React, { useState, useEffect } from "react";
import "./WorkerPage.css";
import useFetchUserData from "../../Hooks/useFetchUserData";
import useFetchUserWorker from "../../Hooks/useFetchUserWorker";
import useSafeTimer from "../../Hooks/useSafeTimer";
import {
  fetchWorkerUp,
  fetchWorkerShield,
  fetchSafeTimer,
  fetchRefers,
} from "../../api/api";

function WorkerPage({
  userID,
  workerID,
  setPreviousPage,
  balance,
  handleUpdateBalance,
}) {
  const { userData, loading, error, refetchUserData } =
    useFetchUserData(workerID);
  const { userWorker, loadingWorker, errorWorker } =
    useFetchUserWorker(workerID);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [timer, setTimer] = useState();
  const [dataRefs, setDataRefs] = useState({});

  const handleRefers = async () => {
    try {
      console.log("workerId", workerID);
      const response = await fetchRefers(workerID);
      setDataRefs(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleRefers();
  }, []);

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
      console.log("upgrade");
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
      handleUpdateBalance();
    } catch (error) {
      handleModalError(error);
    }
  };

  const handleModalError = (error) => {
    let errorMessageToShow = "An error has occurred";
    if (error.response && error.response.data && error.response.data.error) {
      if (error.response.status === 400) {
        errorMessageToShow = "Insufficient funds.";
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
          <div className="workerPageName">{userData.username}</div>
          <div className="workerPageStatus">Worked on you</div>
        </div>
        <div className="workerPageStatusBar">
          <div className="workerPageShield">
            {userData.is_safe === "yes"
              ? `Protected ${userData.timer}`
              : "Not protected"}
          </div>
          <div className="workerPagePayment">{userData.sum_ref_income}/min</div>
        </div>
        <div className="dottedLine"></div>
        <div className={"workerUp"}>
          <p className="workerUpTitle">Earns {userData.income}/min</p>
        </div>

        <div className="workerPlayers">
          <div className="workerPlayersUnit">
            <div className="workerPlayersUnitGroup">
              <div className="workerPlayersUnitPoint">C:</div>
              <div className="workerPlayersUnitCount">
                {dataRefs.c_refs} refs.
              </div>
            </div>
            <div className="workerPlayersUnit_Income">
              +{dataRefs.c_income}/min
            </div>
          </div>
          <div className="workerPlayersUnit">
            <div className="workerPlayersUnitGroup">
              <div className="workerPlayersUnitPoint">D:</div>
              <div className="workerPlayersUnitCount">
                {dataRefs.d_refs} refs.
              </div>
            </div>
            <div className="workerPlayersUnit_Income">
              +{dataRefs.d_income}/min
            </div>
          </div>
          <div className="workerPlayersUnit">
            <div className="workerPlayersUnitGroup">
              <div className="workerPlayersUnitPoint">E:</div>
              <div className="workerPlayersUnitCount">
                {dataRefs.e_refs} refs.
              </div>
            </div>
            <div className="workerPlayersUnit_Income">
              +{dataRefs.e_income}/min
            </div>
          </div>
          <div className="workerPlayersUnit">
            <div className="workerPlayersUnitGroup">
              <div className="workerPlayersUnitPoint">F:</div>
              <div className="workerPlayersUnitCount">
                {dataRefs.f_refs} refs.
              </div>
            </div>
            <div className="workerPlayersUnit_Income">
              +{dataRefs.f_income}/min
            </div>
          </div>
          <div className="workerPlayersUnit">
            <div className="workerPlayersUnitGroup">
              <div className="workerPlayersUnitPoint">G:</div>
              <div className="workerPlayersUnitCount">
                {dataRefs.g_refs} refs.
              </div>
            </div>
            <div className="workerPlayersUnit_Income">
              +{dataRefs.g_income}/min
            </div>
          </div>
        </div>
        <div
          className={
            balance >= userData.level_price
              ? "workerUp yes balance"
              : "workerUp no"
          }
          onClick={handleUp}
        >
          <p className="workerUpTitle">Upgrade for {userData.level_price}</p>
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
            Protect for {userData.shield_price}
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
            for 6 hours
          </p>
        </div>
      </div>

      {modalOpen && (
        <div className="modal">
          <div className="backdrop" onClick={handleModalClose}></div>
          <div className="error-message">
            {errorMessage}
            <div className="error-msg">Try again later</div>
          </div>
        </div>
      )}
    </>
  );
}

export default WorkerPage;
