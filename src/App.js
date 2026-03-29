import React from 'react';


import './styles.css';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Flavors from "./components/FlavorsPage";
import LoginPage from "./components/LoginPage";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/flavors" element={<Flavors />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;