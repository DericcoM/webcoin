import React, { useEffect, useState } from "react";
import useFetchUserData from "../../Hooks/useFetchUserData";
import useTelegramUser from "../../Hooks/useTelegramUser";
import Main from "../Main/Main";
import Reg from "../Reg/Reg";
import Loader from "../../components/Loader/Loader";

function Home() {
  // const userId = 467597194;
  // const userId = 123456789;
  // const userId = 12345678;
  const userId = useTelegramUser();
  const { userData, loading, error } = useFetchUserData(userId);
  const [reg, setReg] = useState(null); // Initial state should be null
  const [value, setValue] = useState("");
  const [loadingError, setLoadingError] = useState(false); // State to track loading error

  const handleReg = async () => {
    try {
      const response = await fetch(
        `https://aylsetalinad.ru/api/is_telegram_player/${userId}`
      );
      console.log(response.status);
      setValue(response.status);
      if (response.status === 200) {
        setReg("main");
      } else if (response.status === 403) {
        setReg("reg");
      }
    } catch (error) {
      console.error("Error:", error);
      setLoadingError(true); // Set loading error to true if there's an error
    }
  };

  useEffect(() => {
    if (userId) {
      handleReg();
    }
  }, [userId]); // Depend on userId to ensure it runs when userId is available

  if (loading || reg === null) {
    return <Loader />; // Show Loader while loading or reg is null
  }

  if (loadingError) {
    // If loading error occurs, prompt for retry
    return (
      <div>
        <p>Error loading data. Please try again.</p>
        <button onClick={handleReg}>Retry</button>
      </div>
    );
  }

  return reg === "main" ? (
    <Main userId={userId} />
  ) : (
    <Reg userId={userId} setReg={setReg} />
  );
}

export default Home;
