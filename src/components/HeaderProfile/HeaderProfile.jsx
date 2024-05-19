import React from "react";
import "./HeaderProfile.css";

function HeaderProfile({ userData, setCurrentPage, setPreviusPage }) {
  return (
    <div className="headerProfile">
      <div className="headerProfileContainer">
        <div className="headerProfileUser">
          <div className="headerProfileUserAvatar">
            <div className="headerProfileUserAvatarIMG"></div>
          </div>
          <div className="headerProfileUserInfo">
            <div className="headerProfileUserName">{userData.name}</div>
            <div className="headerProfileUserCoins">
              <p>{userData.coins}</p>
              <div className="headerProfileUserCoinsSVG">
                <img src="assets/goldMiniCoin.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="headerProfileRating">
          <div className="headerProfileRatingAvatar">
            <div className="headerProfileRatingAvatarIMG">
              <img src="assets/kubok.png" alt="" />
            </div>
          </div>
          <div
            className="headerProfileUserInfoRating"
            onClick={() => {
              setCurrentPage("rating");
              setPreviusPage("main");
            }}
          >
            <div className="headerProfileRatingName">Рейтинг</div>
            <div className="headerProfileUserRating">{userData.rating}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderProfile;
