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


  return (
    <div className="App">
      <Navigation />
      <Route path="/products">
      <MainBoard />
      </Route>
    </div>
  );
}

export default App;
