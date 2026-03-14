// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
// 1. IMPORT DU ROUTER ICI
import { BrowserRouter } from 'react-router-dom' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. ON ENVELOPPE L'APPLICATION ICI */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
