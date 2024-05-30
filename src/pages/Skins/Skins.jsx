import React, { useState } from "react";
import "./Skins.css";
import { fetchUserSkin } from "../../api/api";

function Skins({ userID, currentUserSkin, setCurrentUserSkin }) {
  const [currentSkin, setCurrentSkin] = useState(currentUserSkin);
  const skins = [
    "gold",
    "sapphire",
    "emerald",
    "ruby",
    "dimond",
    "zebra",
    "pixel",
    "chips",
    "leopard",
    "vector",
    "lava",
    "cookie",
    "chip",
    "leather",
    "ball",
    "candy",
    "carpet",
    "firm",
    "glass",
    "cow",
  ];

  const handleSkinSelection = async (skin) => {
    setCurrentSkin(skin);
    setCurrentUserSkin(skin);
    const userSkin = await fetchUserSkin(skin, userID);
    console.log("Response from fetchUserSkin:", userSkin);
  };

  const renderSkinCard = (skin, index) => {
    const isPremium = index < 5;
    const isSelected = currentSkin === skin;

    return (
      <div
        key={skin}
        className={`workerBuyCard ${isSelected ? "current" : ""}`}
        onClick={() => handleSkinSelection(skin)}
      >
        <div className="workerBuyCardTitle">
          <div className="workerBuyCardImg">
            <img
              src={`assets/skins/${skin}.png`}
              alt={skin}
              className="workerBuyAvatar"
            />
          </div>
          <div className="workerBuyCardInfo">
            <div className="workerBuyName">
              {skin.charAt(0).toUpperCase() + skin.slice(1)}
            </div>
            <div className="workerBuyStatusWorked">
              {isPremium ? "Premium" : "Base"}
            </div>
          </div>
        </div>
        <div className="workerBuyDetailsContainer">
          <div className={`circle ${isSelected ? "current" : ""}`}></div>
        </div>
      </div>
    );
  };

  return (
    <div className="playersBuyContainer">
      <div className="playersBuyTitle">Скины</div>
      <div className="buyScrollContainer">
        <div className="groupSkins">Premium</div>
        {skins.slice(0, 5).map(renderSkinCard)}
        <div className="groupSkins">Base</div>
        {skins.slice(5).map(renderSkinCard)}
      </div>
    </div>
  );
}

export default Skins;
