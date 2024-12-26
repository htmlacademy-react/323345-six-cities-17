import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { appStore } from './store/store/app-store.ts';

import App from './app/App.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);


root.render(
  <React.StrictMode>
    <Provider store={appStore}>
      <App/>
    </Provider>
  </React.StrictMode>,
);

