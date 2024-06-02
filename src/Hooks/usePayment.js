import { useState } from 'react';
import axios from 'axios';

const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPaymentLink = async (process) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://ammolin.ru/api/get_payment_link/${process}`);
      return response.data.confirmation.confirmation_url;
    } catch (err) {
      setError(err);
      console.error('Error fetching payment link:', err);
    } finally {
      setLoading(false);
    }
  };

  const redirectToPayment = async (process) => {
    const link = await getPaymentLink(process);
    if (link) {
      window.location.href = link;
    }
  };

  const setupBackButton = () => {
    const tg = window.Telegram.WebApp;
    const BackButton = tg.BackButton;
    BackButton.show();
    BackButton.onClick(() => {
      window.location.href = "https://ammolin.ru";
      BackButton.hide();
    });
  };

  return { redirectToPayment, setupBackButton, loading, error };
};

export default usePayment;
