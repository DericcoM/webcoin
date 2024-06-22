import React, { useRef, useEffect, useState } from "react";
import "./Boost.css";
import { Slider } from "antd";
import usePayment from "../../Hooks/usePayment";
import useBuySlot from "../../Hooks/useBuySlot";
import axios from "axios";
import { buySlot, getSlot } from "../../api/api";

function Boost({ setPreviousPage, setCurrentPage, userId, boost }) {
  const buyScrollRef = useRef(null);
  const [value, setValue] = useState(1);
  const unitPrice = 0.5;
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { getPaymentLink, loading, error } = usePayment();
  const { redirectToPaymentSlot, loadingSlot, errorSlot } = useBuySlot();
  const [slotValue, setSlotValue] = useState();

  const handlePaymentClick = async (process, userId) => {
    console.log(boost);
    if (!boost) {
      console.log("asd");
      const response = await getPaymentLink(process, userId);
      if (response === 403) {
        setErrorMessage("Not enough stars to buy");
        setModalOpen(true);
      } else {
        setPreviousPage("main");
      }
    } else {
      setErrorMessage("Booster already used");
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
    let errorMessageToShow = "An error has occurred";
    if (error.response && error.response.data && error.response.data.error) {
      if (error.response.status === 400) {
        errorMessageToShow = "Insufficient funds";
      }
      if (error.response.status === 403) {
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
        <div className="boostTitle">Boost</div>
        <div className="boostTaskTitle">
          Tasks for
          <div className="boostTaskTitleImg">
            <img src="assets/goldMiniCoin.png" alt="" />
          </div>
        </div>
        <div className="socials">
          <div className="boostSocials">
            <div className="boostSocialsButton testr">
              Something will be here soon
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
              Something will be here soon
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
              Something will be here soon
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
            You have{" "}
            <span className="premium">{slotValue} invitation slots</span>
          </div>
          <div className="boostPremiumDesc">
            Increase the number of slots to
            <br /> it was possible to invite more friends
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
            Buy for {calculatePrice(value)}{" "}
            <div className="boostTaskTitleImg">
              <img src="assets/goldMiniCoin.png" alt="" />
            </div>
          </div>
        </div>
        <div className="boostPremium">
          <div className="boostPremiumTitle fast">
            Acceleration of earnings
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
                Boost for 30{" "}
                <div className="balanceValueImg boost">
                  <img src="assets/star.png" alt="" />
                </div>{" "}
                / 1 hour
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
                Boost for 50{" "}
                <div className="balanceValueImg boost">
                  <img src="assets/star.png" alt="" />
                </div>{" "}
                / 1 hour
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
                Boost for 90{" "}
                <div className="balanceValueImg boost">
                  <img src="assets/star.png" alt="" />
                </div>{" "}
                / 1 hour
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
            <div className="error-msg">Try again later</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Boost;
