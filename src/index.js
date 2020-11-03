import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './index.css';
import App from './App';
import New from './new'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <div>
      <Switch>
        <Route path="/" exact>
          <App />
        </Route>
        <Route path="/products" exact>
          <App />
        </Route>
        <Route path="/products/new" exact>
          <New />
        </Route>
      </Switch>
    </div>
  </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
