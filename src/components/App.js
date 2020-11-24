import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

import {
  Navigation,
  MainBoard,
  Prod,
  SelectedBoard,
  Order,
  Cart
} from './index'


const App = () => {
  const [fetchId, setFetchId] = useState(null)
  const [products, setProducts] = useState([]);

  useEffect(() => {
console.log('this is the fetchId ', fetchId)
  },[fetchId])


  return <Router>
    <div className="App">
      <Navigation />
      <Switch>
        <Route path="/products">
          <MainBoard setFetchId={setFetchId} />
        </Route>
        <Route path={`/product/${fetchId}`}>
          <SelectedBoard setFetchId={setFetchId} fetchId={fetchId} />
        </Route>
      </Switch>
      <Route path="/orders/:orderId">
        <Order />
      </Route>
      <Route path="/orders/cart">
        <Cart />
      </Route>
    </div></Router>
  
}

export default App;
