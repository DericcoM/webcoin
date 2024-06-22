import React, { useState } from "react";
import "./Auth.css";
import Login from "../Login/Login";
import Reg from "../Reg/Reg";

function Auth({}) {
  const [currentPageAuth, setCurrentPageAuth] = useState("auth");

  const handleAuth = () => {
    setCurrentPageAuth("reg");
  };

  const renderContent = () => {
    switch (currentPageAuth) {
      case "auth":
        return (
          <>
            <div className="authMain">
              <div className="authTitle">
                <div className="authTitleImg">
                  <img src="assets/goldLeft.png" alt="" />
                </div>
                <div className="authCoin">
                  <svg width="236" height="32" viewBox="0 0 236 32" fill="none">
                    <path
                      d="M0.74646 1.18021H26.9771V7.13596H17.2621V30.959H10.5038V7.13596H0.74646V1.18021Z"
                      fill="white"
                    />
                    <path
                      d="M37.6495 30.959L29.0749 1.18021H35.9599L43.7742 29.2694H45.506L53.3626 1.18021H60.2476L51.6307 30.959H37.6495Z"
                      fill="white"
                    />
                    <path
                      d="M60.2479 16.0485C60.2479 7.3894 65.9925 0.757812 75.4541 0.757812C84.8735 0.757812 90.618 7.3894 90.618 16.0485C90.618 24.7498 84.8735 31.3814 75.4541 31.3814C65.9925 31.3814 60.2479 24.7498 60.2479 16.0485ZM67.0485 16.0485C67.0485 21.793 69.8363 25.4256 75.4541 25.4256C81.0719 25.4256 83.8597 21.793 83.8597 16.0485C83.8597 10.3462 81.0719 6.71357 75.4541 6.71357C69.8363 6.71357 67.0485 10.3462 67.0485 16.0485Z"
                      fill="white"
                    />
                    <path
                      d="M104.63 13.5564L111.008 1.18021H118.273L107.207 21.3706V30.959H100.406V21.3706L89.3815 1.18021H96.6467L102.94 13.5564V17.4001H104.63V13.5564Z"
                      fill="white"
                    />
                    <path
                      d="M117.007 16.0485C117.007 7.3894 122.836 0.757812 132.298 0.757812C140.619 0.757812 146.11 5.31967 146.997 12.6693H140.239C139.563 8.74106 136.437 6.71357 132.382 6.71357C127.229 6.71357 123.808 9.92376 123.808 16.0485C123.808 22.2154 127.229 25.4256 132.382 25.4256C136.437 25.4256 139.563 23.3559 140.239 19.4276H146.997C146.11 26.8195 140.619 31.3814 132.298 31.3814C122.836 31.3814 117.007 24.7498 117.007 16.0485Z"
                      fill="white"
                    />
                    <path
                      d="M149.924 16.0485C149.924 7.3894 155.669 0.757812 165.13 0.757812C174.55 0.757812 180.294 7.3894 180.294 16.0485C180.294 24.7498 174.55 31.3814 165.13 31.3814C155.669 31.3814 149.924 24.7498 149.924 16.0485ZM156.725 16.0485C156.725 21.793 159.512 25.4256 165.13 25.4256C170.748 25.4256 173.536 21.793 173.536 16.0485C173.536 10.3462 170.748 6.71357 165.13 6.71357C159.512 6.71357 156.725 10.3462 156.725 16.0485Z"
                      fill="white"
                    />
                    <path
                      d="M202.333 1.18021V7.13596H195.575V25.0032H202.333V30.959H182.016V25.0032H188.774V7.13596H182.016V1.18021H202.333Z"
                      fill="white"
                    />
                    <path
                      d="M212.958 30.959H206.157V1.18021H219.505L228.459 29.2694H230.149L228.882 25.0032V1.18021H235.682V30.959H222.292L213.38 2.86978H211.648L212.958 7.13596V30.959Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
              <div className="authSubTitle">
                The game is in{" "}
                <span className="authSubTitleOrange">limited access.</span>{" "}
                Participation in the game are only possible by{" "}
                <span className="authSubTitleOrange">invitation.</span>
              </div>
              {/* <div className="authButton" onClick={handleAuth}>
              Authorization
              </div> */}
              <div className="authSubTitle">
                Follow our updates on social media to become a part of the
                experiment:
              </div>
              <div className="authSocials">
                <a href="https://t.me/tvoycommunity" className="authSocialsImg">
                  <img src="assets/t.png" alt="" />
                </a>
                <a href="http://tvoycoin.com" className="authSocialsSite">
                  tvoycoin.com
                </a>
                <a href="https://x.com/tvoycoin" className="authSocialsImg">
                  <img src="assets/x.png" alt="" />
                </a>
              </div>
            </div>
          </>
        );
      case "login":
        return <Login />;
      case "reg":
        return <Reg />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`auth ${currentPageAuth === "reg" ? "overflow-scroll" : ""}`}
    >
      {renderContent()}
    </div>
  );
}

export default Auth;
