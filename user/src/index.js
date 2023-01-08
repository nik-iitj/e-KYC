import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Routing from "./Routing"
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
    <Router><Routing /></Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
reportWebVitals();