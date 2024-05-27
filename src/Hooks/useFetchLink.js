import { useState, useEffect } from 'react';
import { fetchUserLink } from '../api/api';

const useFetchLink = (userId) => {
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLink = async () => {
      try {
        setLoading(true);
        const userData = await fetchUserLink(userId);
        // Проверяем, что userData не пустой массив и содержит ссылку
        if (Array.isArray(userData) && userData.length > 0 && userData[0].ref_link) {
          setLink(userData[0].ref_link);
        } else {
          throw new Error('Invalid response data');
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLink(); // Вызываем функцию получения баланса сразу

  }, [userId]);
  

  return { link, loading, error };
};

export default useFetchLink;
