import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import {
  Navigation,
  MainBoard
} from './index'


const App = () => {
  const [message, setMessage] = useState([]);


  return (
    <div className="App">
      <Navigation />
      <Route path="/products">
      <MainBoard />
      </Route>
      <div>{message}</div>
    </div>
  );
}

export default App;