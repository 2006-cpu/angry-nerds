import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import {
  App
} from './components';


ReactDOM.render(
  <Router>
    {/* <React.strictMode> */}
      <App />
    {/* </React.strictMode> */}
  </Router>,
  document.getElementById('root')
);