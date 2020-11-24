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

import { callApi } from '../api' ;
import LoginComponent from './Login';


const App = () => {
  const [fetchId, setFetchId] = useState(null)
  const [products, setProducts] = useState([]);
  const [ token, setToken ] = useState('');
  const [ user, setUser ] = useState( {} )

  /* We'll persist login here */
  /* {const userToken = localStorage.getItem('token');
    useEffect( async () => {
      if(userToken) {
        const user = await callApi(
          {token: userToken, url: '/users/me'})
          setUser(user);
      }
    }, []);

  } */

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
        <Route path="/orders/cart">
          <Cart />
        </Route>
        <Route path="/orders/:orderId">
          <Order />
        </Route>
       <Route path="/users/login">
        <LoginComponent token={token} setToken={setToken} user={user} setUser={setUser} />
      </Route>
      </Switch>
    </div></Router>
}

export default App;
