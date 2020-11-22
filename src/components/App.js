import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import {
  Navigation,
  MainBoard,
  Prod,
  SelectedBoard
} from './index'


const App = () => {


  return (
    <div className="App">
      <Navigation />
      <Route path="/products">
        <MainBoard />
      </Route>
      <Route path={`/products/:productId`}>
        <SelectedBoard />
      </Route>
      <Route path="/products/:productId">
        <Prod />
      </Route>
    </div>
  );
}

export default App;
