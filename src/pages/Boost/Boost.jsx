import React, { useRef, useEffect, useState } from "react";
import "./Boost.css";
import { Slider } from "antd";
function Boost({ setCurrentPage }) {
  const buyScrollRef = useRef(null);
  const [value, setValue] = useState(1);

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

  const handleChange = (event) => {
    setValue(event.target.value);
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
            Вам доступно <span className="premium">3 слота</span>
          </div>
          <div className="boostPremiumDesc">
            Увеличьте количество слотов, чтобы
            <br /> можно было приглашать больше друзей
          </div>
          <Slider
            defaultValue={1}
            min={1}
            max={10}
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
          <div className="boostPremiumButton">
            Купить за N{" "}
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
              <div className="boostPremiumX">2X</div>
              <div className="boostPremiumBuyX">Купить за N ₽ / 1 час</div>
            </div>
            <div className="boostPremiumHour">
              <div className="boostPremiumX">5X</div>
              <div className="boostPremiumBuyX">Купить за N ₽ / 1 час</div>
            </div>
            <div className="boostPremiumHour">
              <div className="boostPremiumX">10X</div>
              <div className="boostPremiumBuyX">Купить за N ₽ / 1 час</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Boost;
