import React from "react";
import "./HeaderProfile.css";

function HeaderProfile({ userData, setCurrentPage }) {
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
              <div className="headerProfileUserCoinsSVG"></div>
            </div>
          </div>
        </div>
        <div className="headerProfileRating">
          <div className="headerProfileRatingAvatar">
            <div className="headerProfileRatingAvatarIMG"></div>
          </div>
          <div
            className="headerProfileUserInfoRating"
            onClick={() => setCurrentPage("rating")}
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
