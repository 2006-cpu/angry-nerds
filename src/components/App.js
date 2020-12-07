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
  SelectedBoard,
  Order,
  HomePage,
  Cart, 
  UserBoard,
  SelectedUser
} from './index'


import LoginComponent from './Login';
import RegisterComponent from './Register';


import {getCurrentUser, getCurrentToken} from '../auth'


const App = () => {
  const [fetchId, setFetchId] = useState(null)

  const [products, setProducts] = useState([]);
  const [ token, setToken ] = useState(getCurrentToken());
  const [ user, setUser ] = useState(getCurrentUser())



  useEffect(() => {
console.log('this is the fetchId ', fetchId)
  },[fetchId])

  return <Router>
    <div className="App">
      <Navigation user={user} setUser={setUser} token={token} setToken={setToken} />
      <Switch>
        <Route path="/home">
          <HomePage setFetchId={setFetchId} />
        </Route>
        <Route path="/products">
          <MainBoard setFetchId={setFetchId} user={user} />
        </Route>
        <Route path="/product/:productId">
          <SelectedBoard setFetchId={setFetchId} fetchId={fetchId} user={user} />
        </Route>
        {user && user.isAdmin ?  
        <Route path="/users">
          <UserBoard user={user} />
        </Route>
        : null}
        {user && user.isAdmin ?  
        <Route path="/user/:userId">
          <SelectedUser user={user} />
        </Route>
        : null}
        <Route path="/orders/cart">
          <Cart />
        </Route>
        <Route path="/orders/:orderId">
          <Order />
        </Route>
       <Route path="/users/login">
        <LoginComponent token={token} setToken={setToken} user={user} setUser={setUser} />
      </Route>
      <Route path="/users/register">
        <RegisterComponent token={token} setToken={setToken} user={user} setUser={setUser} />
      </Route>
      <Redirect to="/home" />
      </Switch>
    </div></Router>
}

export default App;
