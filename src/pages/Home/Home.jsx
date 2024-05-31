import React, { useEffect, useState } from "react";
import useFetchUserData from "../../Hooks/useFetchUserData";
import useTelegramUser from "../../Hooks/useTelegramUser";
import Main from "../Main/Main";
import Reg from "../Reg/Reg";

function Home() {
  // const userId = 467597194;
  const userId = useTelegramUser();
  const { userData, loading, error } = useFetchUserData(userId);
  const [reg, setReg] = useState(null); // Initial state should be null
  const [value, setValue] = useState("");

  const handleReg = async () => {
    try {
      const response = await fetch(
        `https://ammolin.ru/api/is_telegram_player/${userId}`
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
    }
  };

  useEffect(() => {
    if (userId) {
      handleReg();
    }
  }, [userId]); // Depend on userId to ensure it runs when userId is available

  if (loading || reg === null) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return reg === "main" ? <Main userId={userId} /> : <Reg userId={userId} setReg={setReg} />;
}

export default Home;
