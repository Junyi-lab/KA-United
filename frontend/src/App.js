import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Components/Home'
import DetailedInfo from './Components/DetailedInfo';


function App() {


  return (

    <div className="App">
      <Switch>
        <Route exact path='/' render={() => (
          <Home />
        )} />
        <Route path='/detail' render={() => (
          <DetailedInfo />
        )} />
      </Switch>
    </div>
  );
}

export default App;
