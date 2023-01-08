import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import App2 from './App2'
import { BrowserRouter as Router } from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
    {/* <Router><Routing /></Router> */}
    <App2/>
  </React.StrictMode>,
  document.getElementById('root')
);

