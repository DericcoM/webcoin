import { useState, useEffect } from 'react';
import { fetchSafeTimer } from '../api/api';
const useSafeTimer = (userID, isSafe) => {
  const [safeTimer, setSafeTimer] = useState([]);
  const [loadingTimer, setLoadingTimer] = useState(true);
  const [errorTimer, setErrorTimer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timerData = await fetchSafeTimer(userID);
        setSafeTimer(timerData);
      } catch (error) {
        setErrorTimer(error);
      } finally {
        setLoadingTimer(false);
      }
    };

    if (isSafe === "yes") {
      fetchData();
    } else {
      setLoadingTimer(false);
    }

    // Cleanup function if needed
    // return () => { /* cleanup code */ };
  }, [userID, isSafe]);

  return { safeTimer, loadingTimer, errorTimer };
};

export default useSafeTimer;
