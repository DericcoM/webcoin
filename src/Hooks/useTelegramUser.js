import { useState, useEffect } from 'react';

const useTelegramUser = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
      setUserId(tg.initDataUnsafe.user.id);
    } else {
      console.warn('Telegram WebApp user information is not available');
    }
  }, []);

  return userId;
};

export default useTelegramUser;
