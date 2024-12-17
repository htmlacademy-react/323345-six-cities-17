import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { appStore } from './store/store/app-store.ts';

import App from './app/App.tsx';
import OFFERS_LIST_MOCK from './mocks/offers-mock.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={appStore}>
      <App offersList={OFFERS_LIST_MOCK}/>
    </Provider>
  </React.StrictMode>,
);
