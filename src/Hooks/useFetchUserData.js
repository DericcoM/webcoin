import { useState, useEffect } from 'react';
import { fetchUserData } from '../api/api';

const useFetchUserData = (userId) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false); // Состояние для отслеживания загрузки данных

  useEffect(() => {
    if (!dataLoaded && userId) { // Проверяем, не загружены ли данные уже
      const getUserData = async () => {
        try {
          setLoading(true);
          const data = await fetchUserData(userId);
          setUserData(Array.isArray(data) && data.length === 1 ? data[0] : data);
          setDataLoaded(true); // После успешной загрузки данных устанавливаем флаг в true
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      getUserData();
    }
  }, [userId, dataLoaded]); // Зависимость от userId и dataLoaded

  const refetchUserData = async () => {
    try {
      setLoading(true);
      const data = await fetchUserData(userId);
      setUserData(Array.isArray(data) && data.length === 1 ? data[0] : data);
      setDataLoaded(true); // После успешной загрузки данных устанавливаем флаг в true
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { userData, loading, error, refetchUserData };
};


export default useFetchUserData;
