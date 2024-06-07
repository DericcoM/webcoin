import { useState } from 'react';
import axios from 'axios';

const useBuySlot = () => {
  const [loadingSlot, setLoadingSlot] = useState(false);
  const [errorSlot, setErrorSlot] = useState(null);

  const getPaymentLinkSlot = async (userId, count) => {
    setLoadingSlot(true);
    setErrorSlot(null);
    try {
      const response = await axios.get(`https://aylsetalinad.ru/api/buy_slot/${userId}/${count}`);
      
      if (response.status === 200) {
        
      }
    } catch (err) {
      setErrorSlot(err);
      console.error('Error fetching payment link:', err);
    } finally {
      setLoadingSlot(false);
    }
  };

  const redirectToPaymentSlot = async (userId, count) => {
     await getPaymentLinkSlot((userId, count));
  };

  return { redirectToPaymentSlot, loadingSlot, errorSlot };
};

export default useBuySlot;
