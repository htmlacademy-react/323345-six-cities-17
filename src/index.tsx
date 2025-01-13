import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { appStore } from './store/app-store.ts';

import App from './app/App.tsx';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);


root.render(
  <React.StrictMode>
    <Provider store={appStore}>
      <ToastContainer theme="colored" />
      <App />
    </Provider>
  </React.StrictMode>,
);

