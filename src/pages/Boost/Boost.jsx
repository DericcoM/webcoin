import React, { useRef, useEffect, useState } from "react";
import "./Boost.css";

function Boost({ setCurrentPage }) {
  const buyScrollRef = useRef(null);
  const adjustMainScrollHeight = () => {
    if (buyScrollRef.current) {
      const windowHeight = window.innerHeight;
      const footerHeight = 80; // Высота подвала
      const maxScrollHeight = windowHeight - footerHeight - 90; // 100 пикселей от низа
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

  return (
    <>
      <div className="boost">
        <div className="boostTitle">Апгрейд</div>
        <div className="buyScrollContainer" ref={buyScrollRef}>
          <div className="boostTaskTitle">
            Задания за
            <div className="boostTaskTitleImg">
              <img src="assets/goldMiniCoin.png" alt="" />
            </div>
          </div>
          <div className="socials">
            <div className="boostSocials">
              <div className="boostSocialsButton">Подписаться на группу</div>
              <div className="boostSocialsEarn">
                <div className="boostTaskTitleImg soc">
                  <img src="assets/goldMiniCoin.png" alt="" />
                </div>
                +1,000
              </div>
              <div className="boostSocialsLink">
                <img src="assets/vk.png" alt="" />
              </div>
            </div>
            <div className="boostSocials">
              <div className="boostSocialsButton">Оценить публикацию</div>
              <div className="boostSocialsEarn">
                <div className="boostTaskTitleImg soc">
                  <img src="assets/goldMiniCoin.png" alt="" />
                </div>
                +1,000
              </div>
              <div className="boostSocialsLink">
                <img src="assets/yandex.png" alt="" />
              </div>
            </div>
            <div className="boostSocials">
              <div className="boostSocialsButton">Подписаться на канал</div>
              <div className="boostSocialsEarn">
                <div className="boostTaskTitleImg soc">
                  <img src="assets/goldMiniCoin.png" alt="" />
                </div>
                +1,000
              </div>
              <div className="boostSocialsLink">
                <img src="assets/tg.png" alt="" />
              </div>
            </div>
          </div>
          <div className="dottedLine soc"></div>
          <div className="boostPremium">
            <div className="boostPremiumTitle">
              <span className="premium">Premium</span> на 12 дней.
            </div>
            <div className="boostPremiumDesc">
              Подписка открывает доступ к множеству <br /> фильтров на вкладке
              Players
            </div>
            <div className="boostPremiumButton">Купить за N ₽</div>
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
    </>
  );
}

export default Boost;
