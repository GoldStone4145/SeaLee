import React from 'react';
import { createRoot } from 'react-dom/client';
import { LanguageProvider } from './i18n/index.jsx';
import App from './App.jsx';
import './styles/style.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);

