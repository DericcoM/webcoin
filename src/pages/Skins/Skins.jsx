import React, { useEffect, useState } from "react";
import "./Skins.css";
import { fetchUserSkin, buySkin, getSkin } from "../../api/api";

function Skins({
  userID,
  currentUserSkin,
  setCurrentUserSkin,
  updateUserData,
}) {
  const [currentUserSkinValue, setCurrentUserSkinValue] =
    useState(currentUserSkin);
  const [userSkins, setUserSkins] = useState({});
  const [skinsList, setSkinList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    handleGetSkin();
  }, [currentUserSkin]);

  useEffect(() => {
    const checkUserSkins = async () => {
      try {
        const response = await getSkin(userID);
        setUserSkins(response[0]);
      } catch (error) {
        handleModalError(error);
      }
    };
    checkUserSkins();
  }, []);

  const handleGetSkin = async () => {
    try {
      const response = await getSkin(userID);
      setUserSkins(response[0]);
    } catch (error) {
      handleModalError(error);
    }
  };

  const handleSkinSelection = async (skinName, skinPrice) => {
    console.log("Selected Skin:", skinName);

    // Проверяем, если скин уже принадлежит текущему пользователю
    if (userSkins[skinName]) {
      setCurrentUserSkinValue(skinName);
      setCurrentUserSkin(skinName);
      await fetchUserSkin(skinName, userID);
      const updatedUserSkins = { ...userSkins };
      setUserSkins(updatedUserSkins);
    } else {
      handleBuySkin(skinName, skinPrice);
      console.log("Этот скин не принадлежит вам."); // Добавляем сообщение об ошибке или другую логику
    }
  };

  const handleBuySkin = async (skinName, price) => {
    try {
      await buySkin(skinName, userID, price);
      handleGetSkin();
    } catch (error) {
      handleModalError(error);
    }
  };

  const skinsData = {
    premium: [
      { name: "gold", price: 0, sum: "0" },
      { name: "sapphire", price: 150000, sum: "150 000" },
      { name: "emerald", price: 1000000, sum: "1 000 000" },
      { name: "ruby", price: 15000000, sum: "15 000 000" },
      { name: "diamond", price: 100000000, sum: "100 000 000" },
    ],
    base: [
      { name: "zebra", price: 15, sum: "15" },
      { name: "pixel", price: 15, sum: "15" },
      { name: "chips", price: 15, sum: "15" },
      { name: "leopard", price: 15, sum: "15" },
      { name: "vector", price: 15, sum: "15" },
      { name: "lava", price: 30, sum: "30" },
      { name: "cookie", price: 30, sum: "30" },
      { name: "ship", price: 30, sum: "30" },
      { name: "leather", price: 30, sum: "30" },
      { name: "ball", price: 30, sum: "30" },
      { name: "candy", price: 45, sum: "45" },
      { name: "carpet", price: 45, sum: "45" },
      { name: "firm", price: 45, sum: "45" },
      { name: "glass", price: 45, sum: "45" },
      { name: "cow", price: 45, sum: "45" },
    ],
  };

  const handleModalError = (error) => {
    let errorMessageToShow = "An error has occurred";
    if (error.response && error.response.data && error.response.data.error) {
      if (error.response.status === 500) {
        errorMessageToShow = "Insufficient funds";
      }
      if (error.response.status === 403) {
        errorMessageToShow = "Insufficient funds.";
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

  const renderSkinCard = (skin, isPremium, readySkin) => {
    const isSelected = userSkins[skin.name];
    const isOwned = currentUserSkin === skin.name;
    const isCurrent = isSelected && currentUserSkinValue === skin.name; // Добавим проверку текущего скина

    return (
      <div
        key={skin.name}
        className={`workerBuyCard ${isSelected ? "selected" : ""}`} // Заменим "current" на "selected"
        onClick={() => handleSkinSelection(skin.name, skin.price)}
      >
        <div className="workerBuyCardTitle">
          <div className="workerBuyCardImg">
            <img
              src={`assets/skins/${skin.name}.png`}
              alt={skin.name}
              className="workerBuyAvatar"
            />
          </div>
          <div className="workerBuyCardInfo">
            <div className="workerBuyName">
              {skin.name.charAt(0).toUpperCase() + skin.name.slice(1)}
            </div>
            <div className="workerBuyPrice skin">
              {skin.sum}
              {/* {!isOwned && ( */}
                <>
                  <div className="workerBuyPriceCoinContainer skin">
                    <img
                      className="workerBuyPriceCoin"
                      src="assets/goldMiniCoin.png"
                      alt=""
                    />
                  </div>
                </>
              {/* )} */}
            </div>
          </div>
        </div>
        {isSelected && (
          <div className={`workerBuyDetailsContainer skin`}>
            <div className={`circle ${isCurrent ? "current" : ""}`} />
          </div>
        )}
        {!isSelected && !isOwned && (
          <button
            className="buySkin"
            onClick={(e) => handleBuySkin(skin.name, skin.price)}
          >
            <div className="cartSkin">
              <img src="assets/cart.png" alt="" />
            </div>
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="playersBuyContainer">
        <div className="playersBuyTitle">Скины</div>
        <div className="buyScrollContainer">
          <div className="groupSkins">Premium</div>
          {skinsData.premium.map((skin) => renderSkinCard(skin, true))}
          <div className="groupSkins">Base</div>
          {skinsData.base.map((skin) => renderSkinCard(skin, false))}
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
    </>
  );
}

export default Skins;
