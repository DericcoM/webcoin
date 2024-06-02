import React, { useRef, useEffect, useState } from "react";
import "./Boost.css";
import { Slider } from "antd";
import usePayment from "../../Hooks/usePayment";
import useBuySlot from "../../Hooks/useBuySlot";
import axios from "axios";
import { buySlot, getSlot } from "../../api/api";

function Boost({ setPreviousPage, setCurrentPage, userId }) {
  const buyScrollRef = useRef(null);
  const [value, setValue] = useState(1);
  const unitPrice = 0.5;
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { redirectToPayment, setupBackButton, loading, error } = usePayment();
  const { redirectToPaymentSlot, loadingSlot, errorSlot } = useBuySlot();
  const [slotValue, setSlotValue] = useState();

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
    setupBackButton();
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
        <div className="boostTitle">Апгрейд</div>
        <div className="boostTaskTitle">
          Задания за
          <div className="boostTaskTitleImg">
            <img src="assets/goldMiniCoin.png" alt="" />
          </div>
        </div>
        <div className="socials">
          <div className="boostSocials">
            <div className="boostSocialsButton testr">
              Скоро здесь что то появится
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
              Скоро здесь что то появится
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
              Скоро здесь что то появится
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
        <div className="boostPremium">
          <div className="boostPremiumTitle">
            Вам доступно <span className="premium">{slotValue} слота</span>
          </div>
          <div className="boostPremiumDesc">
            Увеличьте количество слотов, чтобы
            <br /> можно было приглашать больше друзей
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
            Купить за {calculatePrice(value)}{" "}
            <div className="boostTaskTitleImg">
              <img src="assets/goldMiniCoin.png" alt="" />
            </div>
          </div>
        </div>
        <div className="boostPremium">
          <div className="boostPremiumTitle fast">
            Ускорение заработка
            <div className="boostPremiumTitleImg">
              <img src="assets/goldMiniCoin.png" alt="" />
            </div>
          </div>
          <div className="boostPremiumHourBlock">
            <div className="boostPremiumHour">
              <div
                className="boostPremiumX"
                onClick={() => {
                  redirectToPayment("2x");
                  setPreviousPage("main");
                }}
              >
                2X
              </div>
              <div
                className="boostPremiumBuyX"
                onClick={() => {
                  redirectToPayment("2x");
                  setPreviousPage("main");
                }}
              >
                Купить за 300 ₽ / 1 час
              </div>
            </div>
            <div className="boostPremiumHour">
              <div
                className="boostPremiumX"
                onClick={() => {
                  redirectToPayment("5x");
                  setPreviousPage("main");
                }}
              >
                5X
              </div>
              <div
                className="boostPremiumBuyX"
                onClick={() => {
                  redirectToPayment("5x");
                  setPreviousPage("main");
                }}
              >
                Купить за 450 ₽ / 1 час
              </div>
            </div>
            <div className="boostPremiumHour">
              <div
                className="boostPremiumX"
                onClick={() => {
                  redirectToPayment("10x");
                  setPreviousPage("main");
                }}
              >
                10X
              </div>
              <div
                className="boostPremiumBuyX"
                onClick={() => {
                  redirectToPayment("10x");
                  setPreviousPage("main");
                }}
              >
                Купить за 699 ₽ / 1 час
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
    </div>
  );
}

export default Boost;
