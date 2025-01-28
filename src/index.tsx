import React from 'react';
import { Slide, ToastContainer } from 'react-toastify';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { appStore } from './store/app-store.ts';
import { App } from './app';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);


root.render(
  <React.StrictMode>
    <Provider store={appStore}>
      <ToastContainer theme="colored" transition={Slide} position="top-left" />
      <App />
    </Provider>
  </React.StrictMode>,
);

