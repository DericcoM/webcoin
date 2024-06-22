import React, { useEffect, useState, useRef } from "react";
import "./Main.css";
import axios from "axios";
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
import useFetchBalance from "../../Hooks/useFetchBalance";
import useFetchLink from "../../Hooks/useFetchLink";
import QRCode from "qrcode.react";
import ModalSub from "../../components/ModalSub/ModalSub";
import Profile from "../Profile/Profile";
import Skins from "../Skins/Skins";
import { getSub } from "../../api/api";
import Loader from "../../components/Loader/Loader";
import useFetchSub from "../../Hooks/useFetchSub";

function Main() {
  const [currentPage, setCurrentPage] = useState("main");
  const [workerID, setWorkerID] = useState();
  const mainScrollRef = useRef(null);
  const [buyWorkerID, setBuyWorkerID] = useState([]);
  const [previousPage, setPreviousPage] = useState("main");
  // const userId = 467597194;
  // const userId = 123456789;
  // const userId = 12345678;
  const userId = useTelegramUser();
  const {
    balance,
    loading: balanceLoading,
    error: balanceError,
    refetchBalance,
  } = useFetchBalance(userId);
  const { userData, loading, error, refetchUserData } =
    useFetchUserData(userId);
  const [userTest, setUserTest] = useState(userData);
  const { userWorker, loadingWorker, errorWorker, updateUserData } =
    useFetchUserWorker(userId);
  const [summWorker, setSummWorker] = useState(0);
  const [summWorkerPrice, setSummWorkerPrice] = useState(0);
  const { link, loading: linkLoading, error: linkError } = useFetchLink(userId);
  const [qrText, setQrText] = useState("");
  const [showCopyMessage, setShowCopyMessage] = useState(false); // State to control copy message visibility
  const [currentUserSkin, setCurrentUserSkin] = useState("");
  const [avatarNew, setAvatarNew] = useState(null);
  const [nameNew, setNameNew] = useState(null);
  const [handleSub, setHandleSub] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Состояние для отслеживания загрузки контента
  const [sharedText, setSharedText] = useState("");
  const [modalClose, setModalClose] = useState(false);
  const [shareUrl, setShareUrl] = useState("")
  useEffect(() => {
    const textToCopy = `Hi, bro! ⭐️\n
    This is a secret invite to a private club where you can earn cryptocurrency. Just shhh… Don't share it with anyone!🤫\n
    Remember: YourClick. YourCommunity. YourGame. TvoyCoin — build your social empire today!`;
    const encodedText = encodeURIComponent(textToCopy);
    const url = `https://t.me/share/url?url=${link}&text=${encodedText}`;

    setSharedText(url);

    setTimeout(() => {
      setIsLoading(false); // Устанавливаем isLoading в false после 2 секунд
    }, 1000);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleCopy = async () => {
    const textToCopy = `Hi, bro! ⭐️
  ${link}
  This is a secret invite to a private club where you can earn cryptocurrency. Just shhh… Don't share it with anyone!🤫
      
   Remember: YourClick. YourCommunity. YourGame. TvoyCoin — build your social empire today!`;

    try {
      // Копируем текст в буфер обмена
      await navigator.clipboard.writeText(textToCopy);

      // Устанавливаем текст для QR-кода
      setQrText(link);

      // Показываем сообщение о копировании
      setShowCopyMessage(true);
      setTimeout(() => setShowCopyMessage(false), 1000);

      // Формируем ссылку для передачи в Telegram
      const encodedText = encodeURIComponent(`${textToCopy} ${link}`);
      const telegramShareLink = `tg://msg?text=${encodedText}`;

      // Открываем Telegram для отправки сообщения
      window.open(telegramShareLink, "_blank");

      console.log("Telegram link opened successfully");
    } catch (error) {
      console.error("Error copying or sharing:", error);
    }
  };

  useEffect(() => {
    if (userWorker) {
      handleWorker();
    }
  }, [userWorker, currentPage]);

  const handleWorker = () => {
    if (userWorker && Array.isArray(userWorker)) {
      const flatWorkerArray = userWorker.flat();
      const totalWorkers = flatWorkerArray.length;
      setSummWorker(totalWorkers);

      const totalIncome = flatWorkerArray.reduce((sum, worker) => {
        if (worker && typeof worker.income === "number") {
          return sum + worker.income;
        }
        return sum;
      }, 0);

      // Round the totalIncome to three decimal places
      const roundedIncome = parseFloat(totalIncome.toFixed(3));
      setSummWorkerPrice(roundedIncome);
    }
  };

  useEffect(() => {
    const textToCopy = `Hi, bro! ⭐️\n
    This is a secret invite to a private club where you can earn cryptocurrency. Just shhh… Don't share it with anyone!🤫\n
    Remember: YourClick. YourCommunity. YourGame. TvoyCoin — build your social empire today!`;
    const encodedText = encodeURIComponent(textToCopy);
    const url = `https://t.me/share/url?url=${link}&text=${encodedText}`;

    setSharedText(url);
    document.body.style.overflow = "hidden";
    if (mainScrollRef.current) {
      adjustMainScrollHeight();
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
          refetchUserData(); // Refetch user data when returning to the main page
        }
      });
    }
  }, [currentPage, previousPage]);

  useEffect(() => {
    const textToCopy = `Hi, bro! ⭐️\n
    This is a secret invite to a private club where you can earn cryptocurrency. Just shhh… Don't share it with anyone!🤫\n
    Remember: YourClick. YourCommunity. YourGame. TvoyCoin — build your social empire today!`;
    const encodedText = encodeURIComponent(textToCopy);
    const url = `https://t.me/share/url?url=${link}&text=${encodedText}`;

    setSharedText(url);
    // Call updateUserData when the currentPage is "main"
    if (currentPage === "main") {
      // Выполняем функцию каждую минуту
      updateUserData();
      const intervalId = setInterval(() => {
        refetchBalance(); // Обновляем баланс каждую минуту при возврате на страницу "main"
      }, 15000); // Интервал в миллисекундах (60 секунд)

      // Очищаем интервал при размонтировании компонента или изменении страницы
      return () => clearInterval(intervalId);
    }
  }, [currentPage, updateUserData, refetchBalance]);

  // State and function to control QR modal visibility
  const [showQRModal, setShowQRModal] = useState(false);
  const handleQr = () => {
    setQrText(link);
    setShowQRModal(true);
  };

  const closeModal = () => {
    setShowQRModal(false);
  };

  const handleUpdateBalance = () => {
    refetchBalance();
  };

  if (isLoading) {
    return <Loader />;
  }

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
              balanceuser={balance.toLocaleString("en-US")} // Passing balance to HeaderProfile
              setCurrentPage={setCurrentPage}
              setPreviousPage={setPreviousPage}
              avatarNew={avatarNew}
              nameNew={nameNew}
            />
            <div ref={mainScrollRef} className="mainScroll">
              <div className="bigBalanceContainer">
                <div className="bigBalanceValue">
                  {balance.toLocaleString("en-US")}
                </div>
                <div
                  className="mainCoinContainer"
                  onClick={() => {
                    setCurrentPage("skins");
                    setPreviousPage("main");
                  }}
                >
                  <div className="mainContainerCoinSVG">
                    <img
                      src={`assets/skins/${userData.icon_coin}.png`}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="mainRef">
                {showCopyMessage && (
                  <div
                    className={
                      showCopyMessage ? "mainRefCopy" : "mainRefCopy close"
                    }
                  >
                    Скопировано
                  </div>
                )}
                <div className="mainRefTitle">
                  If other players follow your link, they will become yours
                  workers.
                </div>
                <div className="refButtons">
                  <div className="mainRefButton" onClick={handleQr}>
                    <div className="mainRefButtonContainer">
                      <div className="mainRefQrSVG"></div>
                    </div>
                  </div>
                  <a href={sharedText} className="mainRefButton">
                    <div className="mainRefButtonContainer">
                      <div className="mainRefShareSVG"></div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="worker">
                <div className="workerHeader">
                  <div className="workerTitle">
                    Your workers:
                    <div className="workerCount">{summWorker}</div>
                  </div>
                  <div className="workerMin">{summWorkerPrice}/min</div>
                </div>
                <WorkerCard
                sharedText={sharedText}
                  userData={userWorker}
                  setCurrentPage={setCurrentPage}
                  setWorkerID={setWorkerID}
                  setPreviousPage={setPreviousPage}
                  handleCopy={handleCopy}
                  handleQr={handleQr}
                  handleUpdateBalance={handleUpdateBalance}
                />
              </div>
              {showQRModal && (
                <>
                  <div className="overlay" onClick={closeModal}></div>
                  <div className="qrModal">
                    <QRCode value={link} />
                  </div>
                </>
              )}
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
            balance={balance}
            handleUpdateBalance={handleUpdateBalance}
          />
        );
      case "buy":
        return (
          <PlayersBuy
            userID={userId}
            setCurrentPage={setCurrentPage}
            setBuyWorkerID={setBuyWorkerID}
            setPreviousPage={setPreviousPage}
            handleUpdateBalance={handleUpdateBalance}
          />
        );
      case "buyWorker":
        return (
          <BuyWorker
            userID={userId}
            buyWorkerID={buyWorkerID}
            setCurrentPage={setCurrentPage}
            setPreviousPage={setPreviousPage}
            handleUpdateBalance={handleUpdateBalance}
          />
        );
      case "rating":
        return (
          <Rating
            mainID={userId}
            mainData={userData}
            setCurrentPage={setCurrentPage}
            setPreviousPage={setPreviousPage}
            handleUpdateBalance={handleUpdateBalance}
          />
        );
      case "boost":
        return (
          <Boost
            boost={userData.booster}
            setCurrentPage={setCurrentPage}
            setPreviousPage={setPreviousPage}
            handleUpdateBalance={handleUpdateBalance}
            userId={userId}
          />
        );
      case "trade":
        return (
          <Trade
            setCurrentPage={setCurrentPage}
            setPreviousPage={setPreviousPage}
            stars={userData.stars}
            handleUpdateBalance={handleUpdateBalance}
            userId={userId}
          />
        );
      case "profile":
        return (
          <Profile
            setCurrentPage={setCurrentPage}
            setPreviousPage={setPreviousPage}
            userID={userId}
            defaultName={nameNew !== null ? nameNew : userData.username}
            defaultEmail={userData.mail}
            imgUser={avatarNew !== null ? avatarNew : userData.img}
            handleUpdateBalance={handleUpdateBalance}
            updateUserData={updateUserData}
            setAvatarNew={setAvatarNew}
            setNameNew={setNameNew}
          />
        );
      case "skins":
        return (
          <Skins
            setCurrentPage={setCurrentPage}
            setPreviousPage={setPreviousPage}
            userID={userId}
            currentUserSkin={userData.icon_coin}
            setCurrentUserSkin={setCurrentUserSkin} // Передаем функцию setCurrentUserSkin
            handleUpdateBalance={handleUpdateBalance}
          />
        );

      default:
        return null;
    }
  };

  return (
    !isLoading && (
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
          currentPage !== "rating" &&
          currentPage !== "profile" && (
            <Footer
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              setPreviousPage={setPreviousPage}
              userId={userId}
              handleUpdateBalance={handleUpdateBalance}
            />
          )}
        {!isLoading && renderContent()}
      </div>
    )
  );
}

export default Main;
