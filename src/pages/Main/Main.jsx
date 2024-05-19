import React, { useEffect, useState, useRef } from "react";
import "./Main.css";
import HeaderProfile from "../../components/HeaderProfile/HeaderProfile";
import Footer from "../../components/Footer/Footer";
import WorkerCard from "../../components/WorkerCard/WorkerCard";
import WorkerPage from "../WorkerPage/WorkerPage";
import PlayersBuy from "../PlayersBuy/PlayersBuy";
import BuyWorker from "../BuyWorker/BuyWorker";
import Rating from "../Rating/Rating";
import Boost from "../Boost/Boost";
import Trade from "../Trade/Trade";
import useFetchUserData from "../../Hooks/useFetchUserData";
import useFetchUserWorker from "../../Hooks/useFetchUserWorker";
import useTelegramUser from "../../Hooks/useTelegramUser";

function Main() {
  const [currentPage, setCurrentPage] = useState("main");
  const [workerID, setWorkerID] = useState();
  const mainScrollRef = useRef(null);
  const [buyWorkerID, setBuyWorkerID] = useState([]);
  const [previousPage, setPreviousPage] = useState("main");
  const userId = 467597194; // Example user ID
  const { userData, loading, error, refetchUserData } =
    useFetchUserData(userId);
  const { userWorker, loadingWorker, errorWorker, updateUserData } =
    useFetchUserWorker(userId);
  const [summWorker, setSummWorker] = useState(0);
  const [summWorkerPrice, setSummWorkerPrice] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    if (userWorker) {
      handleWorker();
    }
  }, [userWorker]);

  const handleWorker = () => {
    if (userWorker && Array.isArray(userWorker)) {
      // "Развернуть" вложенные массивы в один плоский массив
      const flatWorkerArray = userWorker.flat();
      const totalWorkers = flatWorkerArray.length;
      setSummWorker(totalWorkers);

      const totalIncome = flatWorkerArray.reduce((sum, worker) => {
        if (worker && typeof worker.income === "number") {
          return sum + worker.income;
        }
        return sum;
      }, 0);
      setSummWorkerPrice(totalIncome);
    }
  };

  useEffect(() => {
    if (
      currentPage !== "main" &&
      currentPage !== "buy" &&
      currentPage !== "rating"
    ) {
      document.body.style.overflow = "visible";
    } else {
      document.body.style.overflow = "hidden";
      if (mainScrollRef.current) {
        const windowHeight = window.innerHeight;
        const headerHeight = 120;
        const footerHeight = 80;
        const mainScrollHeight = windowHeight - headerHeight - footerHeight;
        mainScrollRef.current.style.maxHeight = `${mainScrollHeight + 20}px`;
      }
    }
  }, [currentPage, previousPage]);

  const adjustMainScrollHeight = () => {
    if (mainScrollRef.current) {
      const windowHeight = window.innerHeight;
      const headerHeight = 120;
      const footerHeight = 80;
      const mainScrollHeight = windowHeight - headerHeight - footerHeight;
      mainScrollRef.current.style.maxHeight = `${mainScrollHeight + 20}px`;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", adjustMainScrollHeight);
    return () => {
      window.removeEventListener("resize", adjustMainScrollHeight);
    };
  }, [currentPage, previousPage]);

  useEffect(() => {
    if (currentPage === "buy") {
      setPreviousPage("main");
    }
    if (currentPage === "worker") {
      setPreviousPage("buy");
    }
  }, [currentPage]);

  const renderContent = () => {
    if (loading) {
      return;
    }

    if (error) {
      return <div>Error loading user data: {error.message}</div>;
    }

    switch (currentPage) {
      case "main":
        return (
          <>
            <HeaderProfile
              userData={userData}
              setCurrentPage={setCurrentPage}
              setPreviousPage={setPreviousPage}
            />
            <div ref={mainScrollRef} className="mainScroll">
              <div className="bigBalanceContainer">
                <div className="bigBalanceValue">
                  {userData.balance.toLocaleString("en-US")}
                </div>
                <div className="mainCoinContainer">
                  <div className="mainContainerCoinSVG">
                    <img src="assets/bigCoin.png" alt="" />
                  </div>
                </div>
              </div>
              <div className="mainRef">
                <div className="mainRefTitle">
                  Если другие игроки перейдут по вашей ссылке, они станут вашими
                  работниками.
                </div>
                <div className="refButtons">
                  <div className="mainRefButton">
                    <div className="mainRefButtonContainer">
                      <div className="mainRefQrSVG"></div>
                    </div>
                  </div>
                  <div className="mainRefButton">
                    <div className="mainRefButtonContainer">
                      <div className="mainRefShareSVG"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="worker">
                <div className="workerHeader">
                  <div className="workerTitle">
                    Мои работники:
                    <div className="workerCount">{summWorker}</div>
                  </div>
                  <div className="workerMin">{summWorkerPrice}/min</div>
                </div>
                <WorkerCard
                  userData={userWorker}
                  setCurrentPage={setCurrentPage}
                  setWorkerID={setWorkerID}
                  setPreviousPage={"main"}
                />
              </div>
            </div>
          </>
        );
      case "worker":
        return (
          <WorkerPage
            userID={userId}
            workerID={workerID}
            setCurrentPage={setCurrentPage}
            setPreviousPage={setPreviousPage}
          />
        );
      case "buy":
        return (
          <PlayersBuy
            userID={userId}
            setCurrentPage={setCurrentPage}
            setBuyWorkerID={setBuyWorkerID}
            setPreviousPage={setPreviousPage}
          />
        );
      case "buyWorker":
        return (
          <BuyWorker
            buyWorkerID={buyWorkerID}
            setCurrentPage={setCurrentPage}
            setPreviousPage={setPreviousPage}
            ownerID={userId}
            refetchUserData={refetchUserData}
            updateUserData={updateUserData}
          />
        );
      case "rating":
        return (
          <Rating
            mainID={userId}
            mainData={userData}
            setCurrentPage={setCurrentPage}
            setPreviousPage={setPreviousPage}
          />
        );
      case "boost":
        return (
          <Boost
            setCurrentPage={setCurrentPage}
            setPreviousPage={setPreviousPage}
          />
        );
      case "trade":
        return (
          <Trade
            setCurrentPage={setCurrentPage}
            setPreviousPage={setPreviousPage}
            stars={userData.stars}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (currentPage !== "main") {
      let tg = window.Telegram.WebApp;
      let BackButton = tg.BackButton;
      BackButton.show();
      const scrollToTop = () => {
        window.scrollTo(0, 0);
      };
      BackButton.onClick(function () {
        scrollToTop();
        if (window.pageYOffset === 0) {
          setCurrentPage(previousPage);
          BackButton.hide();
        }
      });
    }
  }, [currentPage, previousPage]);

  return (
    <div
      className={
        currentPage === "rating"
          ? "containerRating"
          : currentPage === "boost"
          ? "containerBoost"
          : "container"
      }
    >
      {currentPage !== "worker" &&
        currentPage !== "buyWorker" &&
        currentPage !== "rating" && (
          <Footer
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            setPreviousPage={setPreviousPage}
          />
        )}
      {renderContent()}
    </div>
  );
}

export default Main;
