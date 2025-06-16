import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';   // Asegúrate de que exista este archivo
import App from './App'; // Sin extensión .tsx

createRoot(
  document.getElementById('root') as HTMLElement // casteo a HTMLElement
).render(
  <StrictMode>
    <App />
  </StrictMode>
);
