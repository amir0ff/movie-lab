import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './styles/globalStylesheet.scss';
import { GlobalStore } from './store';
import { RouterView } from './router/RouterView';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStore>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <RouterView />
      </BrowserRouter>
    </GlobalStore>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
