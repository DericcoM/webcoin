import { useState, useEffect } from 'react';
import { fetchUserData } from '../api/api';

const useFetchBalance = (userId) => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBalance = async () => {
    try {
      setLoading(true);
      const userData = await fetchUserData(userId);
      const userBalance = Array.isArray(userData) && userData.length === 1 ? userData[0].balance : userData.balance;
      setBalance(userBalance);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance(); // Initial fetch
    const interval = setInterval(fetchBalance, 30000); // Fetch every 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [userId]);

  return { balance, loading, error, refetchBalance: fetchBalance };
};

export default useFetchBalance;
