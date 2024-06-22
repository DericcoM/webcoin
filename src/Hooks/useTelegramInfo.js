import { useState, useEffect } from 'react';

const useTelegramInfo = () => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  const [isAttachmentMenu, setIsAttachmentMenu] = useState(false);

  useEffect(() => {
    if (typeof window.Telegram !== 'undefined' && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      if (tg.initDataUnsafe) {
        const user = tg.initDataUnsafe.user;
        console.log("User data:", user);

        if (user && user.first_name && user.last_name) {
          setUserName((user.first_name + " " + user.last_name).slice(0, 20));
        } else {
          if (user && user.first_name) { setUserName(user.first_name + user.last_name);} else {
            if (user && user.username) {
              setUserName(user.username);
            }
          }
          
            
          console.log("Пользователь не авторизован или у него нет username.");
        }

        if (user && user.photo_url) {
          setUserPhoto(user.photo_url);
          console.log("User photo URL:", user.photo_url);
        } else {
          setUserPhoto("https://grizly.club/uploads/posts/2023-08/1692743286_grizly-club-p-kartinki-kruzhok-dlya-avatarki-bez-fona-61.png");
          console.log("Photo URL not found or user not authenticated.");
        }

        // Проверка контекста запуска
        if (tg.initDataUnsafe.start_param === 'attachment_menu') {
          setIsAttachmentMenu(true);
        } else {
          setIsAttachmentMenu(false);
        }
      } else {
        console.log("initDataUnsafe не найден.");
      }
    } else {
      console.log("Telegram Web App объект не найден.");
    }
  }, []);

  return [userName, userPhoto, isAttachmentMenu];
};

export default useTelegramInfo;
