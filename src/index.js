import React from 'react';
import ReactDOM from 'react-dom/client';

import Persist from './view/persist';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Persist />
  </React.StrictMode>,
);
