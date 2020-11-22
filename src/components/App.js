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

import { callApi } from '../api' ;
import LoginComponent from './Login';


const App = () => {

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
      <Route path="/users/login">
        <LoginComponent token={token} setToken={setToken} user={user} setUser={setUser} />
      </Route>
    </div>
  );
}

export default App;
