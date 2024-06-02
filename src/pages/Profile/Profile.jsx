import React, { useState, useEffect, useRef } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useFetchUserData from "../../Hooks/useFetchUserData";

function Profile({
  setCurrentPage,
  setPreviousPage,
  userID,
  defaultName,
  defaultEmail,
}) {
  const [nickname, setNickname] = useState(defaultName); // Initialize with name prop
  const [email, setEmail] = useState(defaultEmail); // Initialize with email prop
  const [img, setImg] = useState(null);
  const [code, setCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonStyle, setButtonStyle] = useState({});
  const navigate = useNavigate();
  const userId = userID;
  const { userData, loading, error } = useFetchUserData(userId);
  const buyScrollRef = useRef(null);

  const adjustMainScrollHeight = () => {
    if (buyScrollRef.current) {
      const windowHeight = window.innerHeight;
      const footerHeight = -12;
      const maxScrollHeight = windowHeight - footerHeight - 35;
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

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const sendVerificationCode = async () => {
    if (!nickname) {
      setErrorMsg("Укажите никнейм.");
      return;
    }
    if (!email) {
      setErrorMsg("Укажите почту.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Введите правильный e-mail адрес!");
      return;
    }

    try {
      setButtonDisabled(true);
      setButtonStyle({
        backgroundColor: "#434343",
        color: "#7D7D7D",
        cursor: "not-allowed",
      });

      const response = await fetch(`https://ammolin.ru/api/send_code/${email}`);
      const responseText = await response.text();

      if (responseText.includes("Success")) {
        setErrorMsg("");
      } else {
        setErrorMsg(responseText);
      }

      setTimeout(() => {
        setButtonDisabled(false);
        setButtonStyle({});
      }, 120000);
    } catch (error) {
      console.error("Error:", error);
      setErrorMsg("Возникла ошибка, попробуйте позже!");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!nickname || !email || !code) {
      setErrorMsg("Заполните все поля!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Введите правильный e-mail адрес!");
      return;
    }

    try {
      const response = await fetch(
        `https://ammolin.ru/api/check_code/${email}/${code}`
      );

      if (response.status === 200) {
        const updateResponse = await fetch(
          `https://ammolin.ru/api/change_profile/${nickname}/${email}/${userId}/${img}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ nickname, email }),
          }
        );

        const updateResponseText = await updateResponse.text();
        if (
          updateResponse.status === 200 &&
          updateResponseText.includes("Success")
        ) {
          navigate("/main");
        } else {
          setErrorMsg(
            "Возникла ошибка при обновлении профиля, попробуйте позже!"
          );
        }
      } else if (response.status === 403) {
        setErrorMsg("Неправильный код подтверждения!");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMsg("Возникла ошибка, попробуйте позже!");
    }
  };

  return (
    <>
      <div className="reg profile">
        <div className="buyScrollContainer profile" ref={buyScrollRef}>
          <div className="regTitle profile">Профиль</div>
          <div className="regAvatar">
            <div className="regAvatarImg">
              <img src="assets/addPhoto.png" alt="avatar" />
            </div>
          </div>
          <div className="regAvatarChange">
            Изменить
            <div className="regAvatarChangeImg">
              <img src="assets/edit.png" alt="edit" />
            </div>
          </div>
          <form className="regForm" onSubmit={handleSubmit}>
            <div className="inputForm">
              <div className="inputFormImg">
                <img src="assets/profileAuth.png" alt="profile" />
              </div>
              <input
                className="input"
                placeholder="Изменить никнейм"
                type="text"
                value={nickname}
                onChange={handleNicknameChange}
                maxLength={10}
              />
            </div>
            <div className="inputForm">
              <div className="inputFormImg">
                <img src="assets/sms.png" alt="sms" />
              </div>
              <input
                className="input"
                placeholder="Изменить почту"
                type="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div
              className="inputForm confirmEmail"
              onClick={sendVerificationCode}
              style={buttonStyle}
            >
              Отправить код
            </div>
            <div className="inputForm">
              <input
                className="input code"
                placeholder="Введите код"
                type="text"
                value={code}
                onChange={handleCodeChange}
              />
            </div>
            {errorMsg && <div className="error">{errorMsg}</div>}
            <button type="submit" className="authButton regB">
              Подтвердить
            </button>
          </form>
          <div className="authSubTitle">
            Следите за нашими обновлениями в социальных сетях:
          </div>
          <div className="authSocials profile">
            <a href="https://t.me/tvoycommunity" className="authSocialsImg">
              <img src="assets/tgAuth.png" alt="" />
            </a>
            <div className="authSocialsSite">tvoycoin.com</div>
            <a href="https://vk.com/tvoycommunity" className="authSocialsImg">
              <img src="assets/vkAuth.png" alt="" />
            </a>
          </div>
          <div className="authDoc">Политика конфиденциальности</div>
          <div className="authDoc profile">Пользовательское соглашение</div>
        </div>
      </div>
    </>
  );
}

export default Profile;
