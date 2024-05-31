import { Route, Routes } from 'react-router-dom'
import './App.css'
import Main from './pages/Main/Main'
import React, { useEffect, useState } from "react";
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';
import Reg from './pages/Reg/Reg';

function App() {
  let tg = window.Telegram.WebApp;
  

  useEffect(() => {
    tg.setBackgroundColor('#181818')
    tg.setHeaderColor('#181818')
    tg.expand()
  }, [])

  return (
      <Routes>
        <Route path="/">
        {/* <Route index element={<Main />} /> */}
          <Route index element={<Home />} />
        </Route>
      </Routes>
  )
}

export default App