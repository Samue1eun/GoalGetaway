import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from './AppRouter.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css'

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </StrictMode>
);