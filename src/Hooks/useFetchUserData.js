import { useState, useEffect } from 'react';
import { fetchUserData } from '../api/api';

const useFetchUserData = (userId) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true);
        const data = await fetchUserData(userId);
        setUserData(Array.isArray(data) && data.length === 1 ? data[0] : data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      getUserData();
    }
  }, [userId]);

  const refetchUserData = async () => {
    try {
      setLoading(true);
      const data = await fetchUserData(userId);
      setUserData(Array.isArray(data) && data.length === 1 ? data[0] : data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { userData, loading, error, refetchUserData };
};

export default useFetchUserData;
