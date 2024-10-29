import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import logo from './img/logo.png';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

const setFavicon = () => {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/png';
  link.href = logo;
  document.head.appendChild(link);
};

setFavicon();