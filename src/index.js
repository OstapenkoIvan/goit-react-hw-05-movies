import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'components/App';
import './index.css';

import { MovieProvider } from './components/useContext.jsx';

const address = window.location.pathname + 'OstapenkoIvan';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MovieProvider>
      <BrowserRouter basename={address}>
        <App />
      </BrowserRouter>
    </MovieProvider>
  </React.StrictMode>
);
