import { useState, useEffect } from 'react';
import { fetchUserWorker } from '../api/api';

const useFetchUserWorker = (userId) => {
  const [userWorker, setUserWorker] = useState(null);
  const [loadingWorker, setLoadingWorker] = useState(false);
  const [errorWorker, setErrorWorker] = useState(null);

  const getUserData = async () => {
    try {
      setLoadingWorker(true);
      const data = await fetchUserWorker(userId);
      setUserWorker(data);
    } catch (err) {
      setErrorWorker(err);
    } finally {
      setLoadingWorker(false);
    }
  };

  useEffect(() => {
    if (userId) {
      getUserData();
    }
  }, [userId]);

  const updateUserData = async () => {
    try {
      const data = await fetchUserWorker(userId);
      setUserWorker(data);
    } catch (err) {
      console.error('Failed to update user data:', err);
    }
  };

  return { userWorker, loadingWorker, errorWorker, updateUserData };
};

export default useFetchUserWorker;
