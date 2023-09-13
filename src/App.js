import React, { useState,useEffect,useRef } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Login from './pages/login';
import Register from './pages/register';

function App() {

  return (
    <main className="app">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />}> </Route>
          {/* <Route index element={<Home />} /> */}
          <Route path="login" element={<Login />} />
       
      </Routes>
    </BrowserRouter>

{/* <Login /> */}
    </main>
  )
}

export default App