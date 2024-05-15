import React, { useEffect, useState } from "react";
import "./Main.css";
import HeaderProfile from "../../components/HeaderProfile/HeaderProfile";
import Footer from "../../components/Footer/Footer";

function Main() {
  const [currentPage, setCurrentPage] = useState("main");

  const userData = {
    name: "Thomas Vien",
    coins: "56,500",
    rating: "10,220" + "th",
    count_slaves: 0,
  };

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage]);

  const renderContent = () => {
    switch (currentPage) {
      case "main":
        return (
          <>
            <div className="bigBalanceContainer">
              <div className="bigBalanceValue">{userData.coins}</div>
              <div className="mainCoinContainer">
                <div className="mainContainerCoinSVG"></div>
              </div>
            </div>
            <div className="mainScroll">
              <div className="mainRef">
                <div className="mainRefTitle">
                  Если другие игроки перейдут по вашей ссылке, они станут вашими
                  работниками.
                </div>
                <div className="refButtons">
                  <div className="mainRefButton">
                    <div className="mainRefButtonContainer">
                      <div className="mainRefQrSVG"></div>
                    </div>
                  </div>
                  <div className="mainRefButton">
                    <div className="mainRefButtonContainer">
                      <div className="mainRefShareSVG"></div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <HeaderProfile userData={userData} setCurrentPage={setCurrentPage} />
      {renderContent()}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default Main;
