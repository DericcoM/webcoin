import { useState, useEffect } from 'react';
import { getSub } from '../api/api';

const useFetchSub = (userId) => {
  const [statusUser, setStatusUser] = useState(null);
  const [loadingStatus, setLoading] = useState(true);
  const [errorStatus, setError] = useState(null);

  const getStatusSub = async () => {
    try {
      const response = await getSub(userId);
      console.log("124124", response.data);
      if (response.data === "Success") {
        setStatusUser(true);
        console.log("status", true); // Проверяем актуальное значение subStatus
      }
    } catch (err) {
      console.log(err);
      setStatusUser(false); // Assuming subscription status is false if there's an error
      console.log("status", false); // Проверяем актуальное значение subStatus
    } finally {
        setStatusUser(false); // Скрываем лоадер после получения ответа
    }
  };

  useEffect(() => {
    

    getStatusSub(); // Вызываем getStatusSub для получения статуса подписки
  }, []);

  return { statusUser, loadingStatus, errorStatus, };
};

export default useFetchSub;
