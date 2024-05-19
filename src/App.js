import { Route, Routes } from 'react-router-dom'
import './App.css'
import Main from './pages/Main/Main'
import React, { useEffect } from "react";


function App() {
  let tg = window.Telegram.WebApp;
  // const handleTouchStart = () => {
  //   document.body.style.backgroundColor = "#181818";
  // };

  // // Обработчик для события touchend (отпускание пальца)
  // const handleTouchEnd = () => {
  //   document.body.style.backgroundColor = "#181818";
  // };

  // // Добавляем обработчики событий при монтировании компонента
  // useEffect(() => {
  //   document.body.addEventListener("touchstart", handleTouchStart);
  //   document.body.addEventListener("touchend", handleTouchEnd);

  //   // Отписываемся от обработчиков при размонтировании компонента
  //   return () => {
  //     document.body.removeEventListener("touchstart", handleTouchStart);
  //     document.body.removeEventListener("touchend", handleTouchEnd);
  //   };
  // }, []);

  useEffect(() => {
    tg.setBackgroundColor('#181818')
    tg.setHeaderColor('#181818')
    tg.expand()
  }, [])

  return (
      <Routes>
        <Route path="/">
          <Route index element={<Main />} />
        </Route>
      </Routes>
  )
}

export default App