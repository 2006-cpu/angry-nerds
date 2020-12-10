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
  SelectedUser,
  AdminUserAdd,
  OrderBoard
} from './index'


import LoginComponent from './Login';
import RegisterComponent from './Register';


import {getCurrentUser, getCurrentToken} from '../auth'

import { getCart } from '../api';

const App = () => {
  const [fetchId, setFetchId] = useState(null)

  const [ orders, setOrders ] = useState([]);
  const [ token, setToken ] = useState(getCurrentToken());
  const [ user, setUser ] = useState(getCurrentUser())



  useEffect(() => {
    console.log('user is ', user)
  },[token])

  return <Router>
    <div className="App">
      <Navigation user={user} setUser={setUser} token={token} setToken={setToken} setOrders={setOrders} />
      <Switch>
        <Route path="/home">
          <HomePage setFetchId={setFetchId} orders={orders} />
        </Route>
        <Route path="/products">
          <MainBoard setFetchId={setFetchId} user={user} orders={orders} />
        </Route>
        <Route path="/product/:productId">
          <SelectedBoard setFetchId={setFetchId} fetchId={fetchId} user={user} orders={orders} />
        </Route>
        {user && user.isadmin ?  
        <Route path="/users">
          <UserBoard user={user} />
        </Route>
        : null}
        {user && user.isadmin ?  
        <Route path="/user/:userId">
          <SelectedUser user={user} />
        </Route>
        : null}
        {user && user.isadmin ?  
        <Route path="/users/add">
          <AdminUserAdd user={user} />
        </Route>
        : null}
        {user && user.isadmin ?  
        <Route path="/orders">
          <OrderBoard user={user} />
        </Route>
        : null}
        <Route path="/orders/cart">
          <Cart orders={orders} setOrders={setOrders} token={token} />
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
