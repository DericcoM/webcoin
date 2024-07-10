import React, { useRef, useEffect, useState } from "react";
import "./Boost.css";
import { Slider } from "antd";
import usePayment from "../../Hooks/usePayment";
import useBuySlot from "../../Hooks/useBuySlot";
import axios from "axios";
import { buySlot, getSlot } from "../../api/api";

function Boost({ setPreviousPage, setCurrentPage, userId, boost, lang }) {
  const buyScrollRef = useRef(null);
  const [value, setValue] = useState(1);
  const unitPrice = 0.5;
  const [modalOpen, setModalOpen] = useState(false);
  const [userBoost, setUserBoost] = useState(boost);
  const [errorMessage, setErrorMessage] = useState("");
  const { getPaymentLink, loading, error } = usePayment();
  const { redirectToPaymentSlot, loadingSlot, errorSlot } = useBuySlot();
  const [slotValue, setSlotValue] = useState();

  const handlePaymentClick = async (process, userId) => {
    console.log(boost);
    if (userBoost === "no") {
      console.log("asd");
      const response = await getPaymentLink(process, userId);
      if (response === 403) {
        setErrorMessage(
          lang.lang === "ru"
            ? "Не хватает звезд для покупки"
            : "Not enough stars to buy"
        );
        setModalOpen(true);
      } else {
        setUserBoost("asd");
        setPreviousPage("main");
      }
    } else {
      setErrorMessage(
        lang.lang === "ru"
          ? "Улучшение уже использовано"
          : "Booster already used"
      );
      setModalOpen(true);
    }
  };

  const getSlotCount = async () => {
    try {
      const response = await getSlot(userId);
      setSlotValue(response[0].slots);
    } catch (err) {
      handleModalError(err);
    }
  };

  useEffect(() => {
    getSlotCount();
  }, []);

  const getPaymentSlot = async (userId, count) => {
    try {
      const response = await buySlot(userId, count);
      console.log(response.status);
      if (response.status === 200) {
        getSlotCount();
        setValue(1);
      } else {
        handleModalError(error);
      }
    } catch (err) {
      handleModalError(err);
    } finally {
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
      }
      if (error.response.status === 403) {
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

  useEffect(() => {
    if (!loading && !error) {
      setModalOpen(false); // Close modal when data is updated
    }
  }, [loading, error]);

  const adjustMainScrollHeight = () => {
    if (buyScrollRef.current) {
      const windowHeight = window.innerHeight;
      const footerHeight = 80; // Height of the footer
      const maxScrollHeight = windowHeight - footerHeight - 35; // Adjust as needed for spacing
      buyScrollRef.current.style.maxHeight = `${maxScrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustMainScrollHeight();
    window.addEventListener("resize", adjustMainScrollHeight);
    return () => {
      window.removeEventListener("resize", adjustMainScrollHeight);
    };
  }, []);

  const handleChange = (value) => {
    setValue(value);
  };

  const calculatePrice = (value) => {
    return value * unitPrice;
  };

  return (
    <div className="boost">
      <div className="buyScrollContainer" ref={buyScrollRef}>
        <div className="boostTitle">
          {lang.lang === "ru" ? "Апгрейд" : "Boost"}
        </div>
        <div className="boostTaskTitle">
          {lang.lang === "ru" ? "Задания за" : "Tasks for"}
          <div className="boostTaskTitleImg">
            <img src="assets/star.png" alt="" />
          </div>
        </div>
        <div className="socials">
          <div className="boostSocials">
            <div className="boostSocialsButton testr">
              {lang.lang === "ru"
                ? "Скоро здесь что-то будет"
                : "Something will be here soon"}
            </div>
            {/* <div className="boostSocialsEarn">
              <div className="boostTaskTitleImg soc">
                <img src="assets/star.png" alt="" />
              </div>
              +100
            </div> */}
            {/* <div className="boostSocialsLink">
              <img src="assets/skins/gold.png" alt="" />
            </div> */}
            <div className="bckggold">
              <div className="boostSocialsLinkasd">
                <img src="assets/skins/gold.png" alt="" />
              </div>
            </div>
          </div>
          <div className="boostSocials">
            <div className="boostSocialsButton testr">
              {lang.lang === "ru"
                ? "Скоро здесь что-то будет"
                : "Something will be here soon"}
            </div>
            {/* <div className="boostSocialsEarn">
              <div className="boostTaskTitleImg soc">
                <img src="assets/goldMiniCoin.png" alt="" />
              </div>
              +1,000
            </div>
            <div className="boostSocialsLink">
              <img src="assets/skins/gold.png" alt="" />
            </div> */}
            <div className="bckggold">
              <div className="boostSocialsLinkasd">
                <img src="assets/skins/gold.png" alt="" />
              </div>
            </div>
          </div>
          <div className="boostSocials">
            <div className="boostSocialsButton testr">
              {lang.lang === "ru"
                ? "Скоро здесь что-то будет"
                : "Something will be here soon"}
            </div>
            {/* <div className="boostSocialsEarn">
              <div className="boostTaskTitleImg soc">
                <img src="assets/goldMiniCoin.png" alt="" />
              </div>
              +1,000
            </div>
            <div className="boostSocialsLink">
              <img src="assets/skins/gold.png" alt="" />
            </div> */}
            <div className="bckggold">
              <div className="boostSocialsLinkasd">
                <img src="assets/skins/gold.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="dottedLine soc"></div>
        {/* <div className="boostPremium">
          <div className="boostPremiumTitle">
            {lang.lang === "ru" ? (
              <>
                У вас <span className="premium">{slotValue} приглашений</span>
              </>
            ) : (
              <>
                You have{" "}
                <span className="premium">{slotValue} invitation slots</span>
              </>
            )}
          </div>

          <div className="boostPremiumDesc">
            {lang.lang === "ru" ? (
              <>
                Увеличьте количество слотов, чтобы
                <br /> можно было пригласить больше друзей
              </>
            ) : (
              <>
                Increase the number of slots to
                <br /> invite more friends
              </>
            )}
          </div>
          <Slider
            defaultValue={1}
            min={1}
            max={10}
            step={1}
            value={value}
            onChange={handleChange}
            tooltipVisible={true}
            railStyle={{ backgroundColor: "#696969", height: 3 }} // стиль полоски
            trackStyle={{ backgroundColor: "#fff" }} // стиль активной полоски
            handleStyle={{
              borderColor: "#fff",
              backgroundColor: "#000",
              boxShadow: "none",
            }} // стиль кружка
            tooltipStyle={{ backgroundColor: "#fff", color: "#181818" }} // стиль подсказки
          />
          <div
            className="boostPremiumButton buy"
            onClick={() => getPaymentSlot(userId, value)}
          >
            {lang.lang === "ru" ? "Купить за " : "Buy for "}
            {calculatePrice(value)}{" "}
            <div className="boostTaskTitleImg">
              <img src="assets/goldMiniCoin.png" alt="" />
            </div>
          </div>
        </div> */}
        <div className="boostPremium">
          <div className="boostPremiumTitle fast">
            {lang.lang === "ru"
              ? "Ускорение заработка"
              : "Acceleration of earnings"}

            <div className="boostPremiumTitleImg">
              <img src="assets/goldMiniCoin.png" alt="" />
            </div>
          </div>
          <div className="boostPremiumHourBlock">
            <div className="boostPremiumHour">
              <div
                className="boostPremiumX"
                onClick={() => {
                  handlePaymentClick("2x", userId);
                  setPreviousPage("main");
                }}
              >
                2X
              </div>
              <div
                className="boostPremiumBuyX"
                onClick={() => {
                  handlePaymentClick("2x", userId);
                  setPreviousPage("main");
                }}
              >
                {lang.lang === "ru" ? "Ускорить за " : "Boost for "} 30{" "}
                <div className="balanceValueImg boost">
                  <img src="assets/star.png" alt="" />
                </div>{" "}
                / 1 {lang.lang === "ru" ? "час" : "hour"}
              </div>
            </div>
            <div className="boostPremiumHour">
              <div
                className="boostPremiumX"
                onClick={() => {
                  handlePaymentClick("5x", userId);
                  setPreviousPage("main");
                }}
              >
                5X
              </div>
              <div
                className="boostPremiumBuyX"
                onClick={() => {
                  handlePaymentClick("5x", userId);
                  setPreviousPage("main");
                }}
              >
                {lang.lang === "ru" ? "Ускорить за " : "Boost for "} 50{" "}
                <div className="balanceValueImg boost">
                  <img src="assets/star.png" alt="" />
                </div>{" "}
                / 1 {lang.lang === "ru" ? "час" : "hour"}
              </div>
            </div>
            <div className="boostPremiumHour">
              <div
                className="boostPremiumX"
                onClick={() => {
                  handlePaymentClick("10x", userId);
                  setPreviousPage("main");
                }}
              >
                10X
              </div>
              <div
                className="boostPremiumBuyX"
                onClick={() => {
                  handlePaymentClick("10x", userId);
                  setPreviousPage("main");
                }}
              >
                {lang.lang === "ru" ? "Ускорить за " : "Boost for "} 90{" "}
                <div className="balanceValueImg boost">
                  <img src="assets/star.png" alt="" />
                </div>{" "}
                / 1 {lang.lang === "ru" ? "час" : "hour"}
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
            <div className="error-msg">
              {lang.lang === "ru" ? "Попробуйте позже" : "Try again later"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Boost;
