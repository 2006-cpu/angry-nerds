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
  SelectedBoard
} from './index'


const App = () => {
  const [fetchId, setFetchId] = useState(null)

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
    </div></Router>
  
}

export default App;
