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
  imgUser,
  handleUpdateBalance,
  updateUserData,
  setAvatarNew,
  setNameNew,
}) {
  const [nickname, setNickname] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);
  const [img, setImg] = useState(null);
  const [code, setCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonStyle, setButtonStyle] = useState({});
  const navigate = useNavigate();
  const userId = userID;
  const { userData, loading, error } = useFetchUserData(userId);
  const buyScrollRef = useRef(null);
  const [avatar, setAvatar] = useState(null);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onload = () => {
        document.querySelector(".regAvatarImg img").src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

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

  // const sendVerificationCode = async () => {
  //   if (!nickname) {
  //     setErrorMsg("Укажите никнейм.");
  //     return;
  //   }
  //   if (!email) {
  //     setErrorMsg("Укажите почту.");
  //     return;
  //   }

  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(email)) {
  //     setErrorMsg("Введите правильный e-mail адрес!");
  //     return;
  //   }

  //   try {
  //     setButtonDisabled(true);
  //     setButtonStyle({
  //       backgroundColor: "#434343",
  //       color: "#7D7D7D",
  //       cursor: "not-allowed",
  //     });

  //     const response = await fetch(
  //       `https://aylsetalinad.ru/api/send_code/${email}`
  //     );
  //     const responseText = await response.text();

  //     if (responseText.includes("Success")) {
  //       setErrorMsg("");
  //     } else {
  //       setErrorMsg(responseText);
  //     }

  //     setTimeout(() => {
  //       setButtonDisabled(false);
  //       setButtonStyle({});
  //     }, 120000);
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setErrorMsg("Возникла ошибка, попробуйте позже!");
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!nickname) {
      setErrorMsg("Заполните все поля!");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("username", nickname);
      formData.append("user_id", userId);
  
      // Check if the avatar is not changed
      if (avatar) {
        formData.append("img", avatar);
      } else {
        formData.append("img", "123");
      }
  
      const updateResponse = await fetch(
        `https://aylsetalinad.ru/api/change_profile`,
        {
          method: "POST",
          body: formData,
        }
      );
  
      const updateResponseText = await updateResponse.text();
      if (
        updateResponse.status === 200 &&
        updateResponseText.includes("Success")
      ) {
        setCurrentPage("main");
        if (avatar) {
          setAvatarNew(`assets/avatars/${avatar.name}`);
        }
        setNameNew(nickname);
      } else {
        setErrorMsg("Error");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMsg("Возникла ошибка, попробуйте позже!");
    }
  };
  

  const openInNewTab = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      <div className="reg profile">
        <div className="buyScrollContainer profile" ref={buyScrollRef}>
          <div className="regTitle profile">Profile</div>
          <div
            className="regAvatar"
            onClick={() =>
              document.querySelector(".regAvatarChange input").click()
            }
          >
            <div className="regAvatarImg upload">
              <img src={imgUser} alt="avatar" />
            </div>
          </div>
          <div className="regAvatarChange">
            Change
            <div className="regAvatarChangeImg">
              <img src="assets/edit.png" alt="edit" />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <form className="regForm" onSubmit={handleSubmit}>
            <div className="inputForm">
              <div className="inputFormImg">
                <img src="assets/profileAuth.png" alt="profile" />
              </div>
              <input
                className="input"
                placeholder="Change name"
                type="text"
                value={nickname}
                onChange={handleNicknameChange}
                maxLength={10}
              />
            </div>
            {/* <div className="inputForm">
              <div className="inputFormImg">
                <img src="assets/sms.png" alt="sms" />
              </div>
              <input
                className="input"
                placeholder="Change email"
                type="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div> */}
            {/* <div
              className="inputForm confirmEmail"
              onClick={sendVerificationCode}
              style={buttonStyle}
              disabled={buttonDisabled}
            >
              Send verification code
            </div> */}
            {/* <div className="inputForm">
              <input
                className="input code"
                placeholder="Code"
                type="text"
                value={code}
                onChange={handleCodeChange}
              />
            </div> */}
            {errorMsg && <div className="error">{errorMsg}</div>}
            <button type="submit" className="authButton regB">
              Apply
            </button>
          </form>
          <div className="authSubTitle">
            Follow our updates on social media:
          </div>
          <div className="authSocials profile">
            <a
              href="https://t.me/tvoycommunity"
              className="authSocialsImg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="assets/t.png" alt="" />
            </a>
            <a
              href="http://tvoycoin.com"
              className="authSocialsSite"
              onClick={() => openInNewTab("http://tvoycoin.com")}
            >
              tvoycoin.com
            </a>
            <a
              href="https://x.com/tvoycoin"
              className="authSocialsImg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="assets/x.png" alt="" />
            </a>
          </div>
          <a
            href="#"
            onClick={() => openInNewTab("http://tvoycoin.com/policy")}
            className="authDoc"
          >
            Privacy policy
          </a>
          <a
            href="#"
            onClick={() => openInNewTab("http://tvoycoin.com/user_agreement")}
            className="authDoc profile"
          >
            User agreement
          </a>
        </div>
      </div>
    </>
  );
}

export default Profile;
