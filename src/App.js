import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main/Main";
import React, { useEffect } from "react";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Reg from "./pages/Reg/Reg";

function App() {
  let tg = window.Telegram.WebApp;

  useEffect(() => {
    tg.setBackgroundColor("#181818");
    tg.setHeaderColor("#181818");
    tg.expand();
  }, [tg]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/noRef" element={<Auth />} />
    </Routes>
  );
}

export default App;
