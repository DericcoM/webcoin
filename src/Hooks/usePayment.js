import { useState } from 'react';
import axios from 'axios';

const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPaymentLink = async (process, userId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://aylsetalinad.ru/api/buy_booster/${process}/${userId}`);
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setError(403);
        return 403;
      } else {
        setError(err.message);
        return err.message;
      }
    } finally {
      setLoading(false);
    }
  };

  return { getPaymentLink, loading, error };
};

export default usePayment;
