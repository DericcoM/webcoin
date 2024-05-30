import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useFetchUserData from "../../Hooks/useFetchUserData";
import useTelegramUser from "../../Hooks/useTelegramUser";

function Home() {
  const navigate = useNavigate();
  const userId = 467597194;
  const { userData, loading, error } = useFetchUserData(userId);

  useEffect(() => {
    if (!loading && !error) {
      if (userData && userData.id) {
        // Check if userData is not null before accessing its properties
        navigate("/main");
      } else {
        navigate("/reg");
      }
    }
  }, [loading, error, userData, navigate]);

  return null;
}

export default Home;
