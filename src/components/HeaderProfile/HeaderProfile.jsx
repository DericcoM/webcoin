import React from "react";
import "./HeaderProfile.css";

function HeaderProfile({
  userData,
  setCurrentPage,
  setPreviousPage,
  balanceuser,
}) {
  const balance = balanceuser;
  const rating = userData.rating.toLocaleString("en-US") + "th";
  // const ratingString = rating + "th";
  return (
    <div className="headerProfile">
      <div className="headerProfileContainer">
        <div
          className="headerProfileUser"
          onClick={() => {
            setCurrentPage("profile");
            setPreviousPage("main");
          }}
        >
          <div className="headerProfileUserAvatar">
            <img
              className="headerProfileUserAvatarIMG"
              src={userData.img}
              alt=""
            />
          </div>
          <div className="headerProfileUserInfo">
            <div className="headerProfileUserName">
              {userData.user_fullname}
            </div>
            <div className="headerProfileUserCoins">
              <p>{balance}</p>
              <div className="headerProfileUserCoinsSVG">
                <img src="assets/goldMiniCoin.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div
          className="headerProfileRating"
          onClick={() => {
            setCurrentPage("rating");
            setPreviousPage("main");
          }}
        >
          <div className="headerProfileRatingAvatar">
            <div className="headerProfileRatingAvatarIMG">
              <img src="assets/kubok.png" alt="" />
            </div>
          </div>
          <div className="headerProfileUserInfoRating">
            <div className="headerProfileRatingName">Рейтинг</div>
            <div className="headerProfileUserRating">{rating}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderProfile;
