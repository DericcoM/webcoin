import { useState, useEffect } from 'react';
import { fetchUserData } from '../api/api';

const useFetchBalance = (userId) => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchBalance(); // Вызываем функцию получения баланса сразу
    const interval = setInterval(fetchBalance, 10000); // Запускаем интервал для периодического обновления

    return () => clearInterval(interval); // Очищаем интервал при размонтировании компонента
  }, [userId]);
  
  // Функция для повторного запроса баланса
  const refetchBalance = async () => {
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

  return { balance, loading, error, refetchBalance };
};

export default useFetchBalance;
