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
      return response.data.confirmation.confirmation_url;
    } catch (err) {
      if (err.response && err.response.status === 403) {
        return err.response.status;
      } else {
        setError(err);
        console.error('Error fetching payment link:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  const redirectToPayment = async (process, userId) => {
    const result = await getPaymentLink(process, userId);
    if (result.error) {
      return result.error;
    } else if (result) {
      window.location.href = result;
    }
  };


  return { redirectToPayment, loading, error };
};

export default usePayment;
