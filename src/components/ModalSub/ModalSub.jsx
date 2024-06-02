import React from "react";
import "./ModalSub.css";
import usePayment from "../../Hooks/usePayment";

function ModalSub({ show, onClose }) {
  const { redirectToPayment, loading, error } = usePayment();
  if (!show) {
    return null;
  }

  return (
    <>
      <div className="overlay"></div>
      <div className={`modalSub ${show ? "show" : ""}`}>
        <div className="modal-content">
          <div className="modalImg">
            <img src="assets/modalImg.png" alt="" />
          </div>
          <div className="modal-info">
            <div className="modal-text">
              Особенность нашего проекта в том, что мы решили дать доступ только
              на 3 месяца.
            </div>
            <div className="modal-text">
              Знаете, как говорят - "живи каждый день так, будто это последний",
              и мы решили применить эту философию к нашей игре! Мы не знаем, что
              будет завтра, но в течение этих 90 дней у вас будет возможность
              полностью оценить функционал нашей игры, принять участие в нашем
              научном исследовании и даже сделать свой небольшой вклад в
              развитие проекта.
            </div>
          </div>
          <div
            className="authButton subBuy"
            onClick={() => {
              // redirectToPayment("game");
              onClose();
            }}
          >
            99 Рублей
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalSub;
