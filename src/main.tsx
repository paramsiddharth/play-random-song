import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'normalize.css';
import '@fontsource/michroma/index.css';

import './index.css';

import App from './app.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
