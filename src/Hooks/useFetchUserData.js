import { useState, useEffect, useCallback } from 'react';
import { fetchUserData } from '../api/api';

const useFetchUserData = (userId) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserData = useCallback(async () => {
    if (!userId) return; // Проверка наличия userId

    setLoading(true);
    try {
      const data = await fetchUserData(userId);
      setUserData(Array.isArray(data) && data.length === 1 ? data[0] : data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const refetchUserData = async () => {
    await getUserData();
  };

  return { userData, loading, error, refetchUserData };
};

export default useFetchUserData;
