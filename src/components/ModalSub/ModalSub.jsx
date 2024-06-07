import React from "react";
import "./ModalSub.css";
import usePayment from "../../Hooks/usePayment";
import axios from "axios";

function ModalSub({ show, onClose, userId, setSubStatus, handleSub, updateUserData }) {
  const { redirectToPayment, loading, error } = usePayment();

  // if (!show) {
  //   return null;
  // }

  const handlePay = () => {
    // eslint-disable-next-line no-undef
    var widget = new cp.CloudPayments({
      language: "ru-RU",
    });
    widget.pay(
      "auth", // или 'charge'
      {
        publicId: "pk_24e356224d1feaeb34d15e014904b", //id из личного кабинета
        description: "Оплата товаров в tvoycoin.com", //назначение
        amount: 99, //сумма
        currency: "RUB", //валюта
        accountId: userId, //идентификатор плательщика (необязательно)
        skin: "mini", //дизайн виджета (необязательно)
        autoClose: 3, // авто-закрытие окна после успешной оплаты через 3 секунды
      },
      {
        onSuccess: async function (options) {
          // действие при успешной оплате
          console.log("Payment Successful!");
          try {
            const response = await axios.get(
              `https://aylsetalinad.ru/api/check_payment/${userId}`
            );
            updateUserData()
            handleSub(false)
            return response;
          } catch (err) {
            console.log(err);
          }
        },
        onFail: function (reason, options) {
          console.log("Payment Failed!", reason);
        },
        onComplete: function (paymentResult, options) {
          // вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции
          console.log("Payment Complete!", paymentResult);
          // Вы можете вызывать свою аналитику здесь, если необходимо
        },
      }
    );
  };

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className={`modalSub ${show ? "show" : ""}`}>
        <div className="modal-content">
          <div className="modalImg">
            <img src="assets/modalImg.png" alt="" />
          </div>
          <div className="modal-info">
            <div className="modal-text">
              Особенность нашего проекта в том, что мы решили дать
              доступ только на 3 месяца.
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
          <div className="authButton subBuy" onClick={handlePay}>
            99 Рублей
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalSub;
