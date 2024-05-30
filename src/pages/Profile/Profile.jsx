import React, { useState, useEffect, useRef } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useTelegramUser from "../../Hooks/useTelegramUser";
import useFetchUserData from "../../Hooks/useFetchUserData";

function Profile(setCurrentPage, setPreviousPage, userID) {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false); // Define buttonDisabled state
  const [buttonStyle, setButtonStyle] = useState({}); // Define buttonStyle state
  const navigate = useNavigate();
  const userId = userID;
  const { userData, loading, error } = useFetchUserData(userId);
  const buyScrollRef = useRef(null);

  //   useEffect(() => {
  //     if (!loading && !error) {
  //       if (userData && userData.id) {
  //         navigate("/main");
  //       }
  //     }
  //   }, [loading, error, userData, navigate]);

  const adjustMainScrollHeight = () => {
    if (buyScrollRef.current) {
      const windowHeight = window.innerHeight;
      const footerHeight = -12; // Height of the footer
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
    // Check if the nickname field is filled
    if (!nickname) {
      setErrorMsg("Укажите никнейм.");
      return;
    }
    // Check if the email field is filled
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
      // Disable the button and change its styles
      setButtonDisabled(true);
      setButtonStyle({
        backgroundColor: "#434343",
        color: "#7D7D7D",
        cursor: "not-allowed",
      });

      const response = await fetch(
        `https://ammolin.ru/api/check_code/${email}`
      );
      const data = await response.json();
      if (data.error) {
        setErrorMsg(data.error);
      } else {
        setErrorMsg("");
      }

      // Enable the button and revert its styles after 2 minutes
      setTimeout(() => {
        setButtonDisabled(false);
        setButtonStyle({}); // Revert to initial styles
      }, 120000); // 2 minutes in milliseconds
    } catch (error) {
      console.error("Error:", error);
      setErrorMsg("Возникла ошибка, попробуйте позже!");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if all fields are filled
    if (!nickname || !email || !code) {
      setErrorMsg("Заполните все поля!");
      return;
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Введите правильный e-mail адрес!");
      return;
    }
    try {
      // Call API to check the code
      const response = await fetch(
        `https://ammolin.ru/api/confirm_code/${email}`
      );
      const data = await response.json();
      if (data.code !== code) {
        setErrorMsg("Неправильный код подтверждения!");
        return;
      }
      // Call API to register user
      const registerResponse = await fetch(
        `https://ammolin.ru/api/register/${nickname}/${email}/${userId}/${code}`,
        {
          // Include any necessary headers and body
        }
      );
      // Handle registration success, redirect user
      window.location.href = "/"; // Redirect to homepage
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
              <img src="assets/addPhoto.png" alt="" />
            </div>
          </div>
          <div className="regAvatarChange">
            Изменить
            <div className="regAvatarChangeImg">
              <img src="assets/edit.png" alt="" />
            </div>
          </div>
          <form className="regForm" onSubmit={handleSubmit}>
            <div className="inputForm">
              <div className="inputFormImg">
                <img src="assets/profileAuth.png" alt="" />
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
                <img src="assets/sms.png" alt="" />
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
            <div className="authSocialsImg">
              <img src="assets/tgAuth.png" alt="" />
            </div>
            <div className="authSocialsSite">tvoycoin.com</div>
            <div className="authSocialsImg">
              <img src="assets/vkAuth.png" alt="" />
            </div>
          </div>
          <div className="authDoc">Политика конфиденциальности</div>
          <div className="authDoc profile">Пользовательское соглашение</div>
          {/* <div className="authSvg">
            <svg width="145" height="21" viewBox="0 0 145 21" fill="none">
              <g opacity="0.34">
                <path
                  d="M0.803968 0C0.359949 0 0 0.367106 0 0.819953V5.78679C0 6.23964 0.359948 6.60675 0.803967 6.60675L5.83928 6.60675C6.04597 6.60675 6.24471 6.68793 6.39426 6.83344L10.7738 11.0949C11.0845 11.3972 11.5732 11.3972 11.8838 11.0949L16.2634 6.83344C16.4129 6.68793 16.6117 6.60675 16.8183 6.60675L21.8537 6.60675C22.2977 6.60675 22.6576 6.23964 22.6576 5.78679L22.6576 0.819952C22.6576 0.367105 22.2977 0 21.8536 0H0.803968Z"
                  fill="white"
                />
                <path
                  d="M6.16129 20.18C6.16129 20.6329 6.52124 21 6.96526 21H15.6501C16.0926 21 16.4519 20.6354 16.4541 20.1842L16.4869 13.5474C16.4905 12.8266 15.646 12.4522 15.1316 12.9465L11.8802 16.0711C11.5705 16.3687 11.0871 16.3687 10.7775 16.0711L7.5166 12.9374C7.00365 12.4445 6.16129 12.8154 6.16129 13.5342V20.18Z"
                  fill="white"
                />
                <path
                  d="M30.5251 3.40444H43.3062V6.36414H38.5725V18.2029H35.2794V6.36414H30.5251V3.40444Z"
                  fill="white"
                />
                <path
                  d="M48.5065 18.2029L44.3284 3.40444H47.6832L51.4908 17.3633H52.3346L56.1628 3.40444H59.5176L55.319 18.2029H48.5065Z"
                  fill="white"
                />
                <path
                  d="M59.5178 10.7932C59.5178 6.49008 62.3169 3.19453 66.9271 3.19453C71.5168 3.19453 74.3159 6.49008 74.3159 10.7932C74.3159 15.1173 71.5168 18.4128 66.9271 18.4128C62.3169 18.4128 59.5178 15.1173 59.5178 10.7932ZM62.8314 10.7932C62.8314 13.6479 64.1898 15.4531 66.9271 15.4531C69.6645 15.4531 71.0229 13.6479 71.0229 10.7932C71.0229 7.95944 69.6645 6.15423 66.9271 6.15423C64.1898 6.15423 62.8314 7.95944 62.8314 10.7932Z"
                  fill="white"
                />
                <path
                  d="M81.1434 9.55474L84.2512 3.40444H87.7912L82.3989 13.438V18.2029H79.0852V13.438L73.7134 3.40444H77.2535L80.3201 9.55474V11.4649H81.1434V9.55474Z"
                  fill="white"
                />
                <path
                  d="M87.1743 10.7932C87.1743 6.49008 90.0145 3.19453 94.6248 3.19453C98.6794 3.19453 101.355 5.46154 101.787 9.11393H98.4941C98.1648 7.16179 96.6418 6.15423 94.666 6.15423C92.155 6.15423 90.4879 7.74953 90.4879 10.7932C90.4879 13.8578 92.155 15.4531 94.666 15.4531C96.6418 15.4531 98.1648 14.4246 98.4941 12.4725H101.787C101.355 16.1458 98.6794 18.4128 94.6248 18.4128C90.0145 18.4128 87.1743 15.1173 87.1743 10.7932Z"
                  fill="white"
                />
                <path
                  d="M103.213 10.7932C103.213 6.49008 106.013 3.19453 110.623 3.19453C115.212 3.19453 118.012 6.49008 118.012 10.7932C118.012 15.1173 115.212 18.4128 110.623 18.4128C106.013 18.4128 103.213 15.1173 103.213 10.7932ZM106.527 10.7932C106.527 13.6479 107.885 15.4531 110.623 15.4531C113.36 15.4531 114.719 13.6479 114.719 10.7932C114.719 7.95944 113.36 6.15423 110.623 6.15423C107.885 6.15423 106.527 7.95944 106.527 10.7932Z"
                  fill="white"
                />
                <path
                  d="M128.75 3.40444V6.36414H125.457V15.2432H128.75V18.2029H118.851V15.2432H122.144V6.36414H118.851V3.40444H128.75Z"
                  fill="white"
                />
                <path
                  d="M133.927 18.2029H130.613V3.40444H137.117L141.481 17.3633H142.304L141.686 15.2432V3.40444H145V18.2029H138.476L134.133 4.24407H133.289L133.927 6.36414V18.2029Z"
                  fill="white"
                />
              </g>
            </svg>
          </div>
          <div className="authDocConfirm">
            Нажимая "Начать", Вы подтверждаете, что полностью ознакомились с
            лицензионным (пользовательским) соглашением, политикой
            конфиденциальности информации и обработки персональных данных и
            приложениями к ним. Положения Вам полностью понятны, и Вы не имеете
            возражений и согласны с условиями игры. Нажимая "Начать", Вы даете
            согласие на обработку персональных данных.
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Profile;
