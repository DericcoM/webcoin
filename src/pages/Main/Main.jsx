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

function Main() {
  const [currentPage, setCurrentPage] = useState("main");
  const [workerID, setWorkerID] = useState();
  const mainScrollRef = useRef(null); // Ссылка на блок mainScroll
  const [buyWorkerID, setBuyWorkerID] = useState([]);
  const [previusPage, setPreviusPage] = useState("main");
  const userData = {
    name: "Thomas Vien",
    coins: "56,501",
    rating: "10,220 th",
    count_slaves: 0,
    workerCount: 6,
    workerMin: 123,
  };

  useEffect(() => {
    // Прокрутить страницу к самому верху при монтировании компонента
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    console.log(currentPage);
    adjustMainScrollHeight(); // Вызываем функцию для корректировки высоты mainScroll при загрузке страницы
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Обработка изменения currentPage
    if (
      currentPage !== "main" &&
      currentPage !== "buy" &&
      currentPage !== "rating"
    ) {
      document.body.style.overflow = "visible"; // Включить прокрутку для всех страниц, кроме main и buyWorker
    } else {
      document.body.style.overflow = "hidden"; // Отключить прокрутку для страниц main и buyWorker
      if (mainScrollRef.current) {
        const windowHeight = window.innerHeight;
        const headerHeight = 120; // Предположим, что высота заголовка равна 60px
        const footerHeight = 80; // Предположим, что высота подвала равна 80px
        const mainScrollHeight = windowHeight - headerHeight - footerHeight;
        mainScrollRef.current.style.maxHeight = `${mainScrollHeight + 20}px`;
      }
    }
  }, [currentPage, previusPage]);

  // Функция для корректировки высоты mainScroll
  const adjustMainScrollHeight = () => {
    if (mainScrollRef.current) {
      const windowHeight = window.innerHeight;
      const headerHeight = 120; // Предположим, что высота заголовка равна 60px
      const footerHeight = 80; // Предположим, что высота подвала равна 76px
      const mainScrollHeight = windowHeight - headerHeight - footerHeight;
      mainScrollRef.current.style.maxHeight = `${mainScrollHeight + 20}px`;
    }
  };

  // Вызываем adjustMainScrollHeight при изменении размеров окна
  useEffect(() => {
    window.addEventListener("resize", adjustMainScrollHeight);
    return () => {
      window.removeEventListener("resize", adjustMainScrollHeight);
    };
  }, [currentPage, previusPage]);

  useEffect(() => {
    if (currentPage === "buy") {
      setPreviusPage("main");
    }
    if (currentPage === "worker") {
      setPreviusPage("buy");
    }
  }, [currentPage, previusPage]);

  const renderContent = () => {
    switch (currentPage) {
      case "main":
        return (
          <>
            <HeaderProfile
              userData={userData}
              setCurrentPage={setCurrentPage}
              setPreviusPage={setPreviusPage}
            />
            <div ref={mainScrollRef} className="mainScroll">
              <div className="bigBalanceContainer">
                <div className="bigBalanceValue">{userData.coins}</div>
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
                    <div className="workerCount">{userData.workerCount}</div>
                  </div>
                  <div className="workerMin">{userData.workerMin}/min</div>
                </div>
                <WorkerCard
                  userData={userData}
                  setCurrentPage={setCurrentPage}
                  setWorkerID={setWorkerID}
                  setPreviusPage={setPreviusPage}
                />
              </div>
            </div>
          </>
        );
      case "worker":
        return (
          <WorkerPage
            workerID={workerID}
            setCurrentPage={setCurrentPage}
            setPreviusPage={setPreviusPage}
          />
        );
      case "buy":
        return (
          <PlayersBuy
            setCurrentPage={setCurrentPage}
            setBuyWorkerID={setBuyWorkerID}
            setPreviusPage={setPreviusPage}
          />
        );
      case "buyWorker":
        return (
          <BuyWorker
            buyWorkerID={buyWorkerID}
            setCurrentPage={setCurrentPage}
            setPreviusPage={setPreviusPage}
          />
        );
      case "rating":
        return (
          <Rating
            setCurrentPage={setCurrentPage}
            setPreviusPage={setPreviusPage}
          />
        );
      case "boost":
        return (
          <Boost
            setCurrentPage={setCurrentPage}
            setPreviusPage={setPreviusPage}
          />
        );
      case "trade":
        return (
          <Trade
            setCurrentPage={setCurrentPage}
            setPreviusPage={setPreviusPage}
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
        window.scrollTo(0, 0); // Прокрутить страницу к верху
      };
      BackButton.onClick(function () {
        scrollToTop();
        if (window.pageYOffset === 0) {
          setCurrentPage(previusPage);
          BackButton.hide();
        }
      });
    }
  }, [currentPage, previusPage]);

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
            setPreviusPage={setPreviusPage}
          />
        )}
      {renderContent()}
    </div>
  );
}

export default Main;
