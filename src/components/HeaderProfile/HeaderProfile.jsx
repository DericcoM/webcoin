import React, { useState, useEffect } from "react";
import "./HeaderProfile.css";

function HeaderProfile({
  userData,
  setCurrentPage,
  setPreviousPage,
  balanceuser,
  avatarNew,
  nameNew,
  lang,
  skin
}) {
  const [userRating, setUserRating] = useState(null);
  const balance = balanceuser;

  useEffect(() => {
    async function fetchRating() {
      try {
        const response = await fetch("https://aylsetalinad.ru/api/get_rating");
        const data = await response.json();

        // Assuming data is an array of user objects with a username property
        const sortedData = data.sort((a, b) => a.rating - b.rating);
        const userIndex = sortedData.findIndex(user => user.username === userData.username);

        // userIndex + 1 to convert from zero-indexed to ranking position
        if (userIndex !== -1) {
          setUserRating(userIndex + 1);
        } else {
          setUserRating(userData.rating); // Fallback to userData.rating if user not found
        }
      } catch (error) {
        console.error("Failed to fetch rating:", error);
        setUserRating(userData.rating); // Fallback to userData.rating on error
      }
    }

    fetchRating();
  }, [userData.username, userData.rating]);

  const displayRating = userRating !== null ? `${userRating}th` : "Loading...";

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
              src={avatarNew !== null ? avatarNew : userData.img}
              alt=""
            />
          </div>
          <div className="headerProfileUserInfo">
            <div className="headerProfileUserName">
              {nameNew !== null
                ? nameNew.length > 12
                  ? `${nameNew.slice(0, 12)}...`
                  : nameNew
                : userData.username.length > 12
                ? `${userData.username.slice(0, 12)}...`
                : userData.username}
            </div>
            <div className="headerProfileUserCoins">
              <p>{balance}</p>
              <div className="headerProfileUserCoinsSVG">
                <img src={`assets/skins/${skin}.png`} alt="" />
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
            <div className="headerProfileRatingName">
              {lang.lang === "ru" ? "Рейтинг" : "Rating"}
            </div>
            <div className="headerProfileUserRating">{displayRating}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderProfile;
