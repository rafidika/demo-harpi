import React from 'react'
import './App.css';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from './components/Form';
import Admin from './components/Admin'

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/admin" component={Admin}/>
        <Route path="/" component={Form}/>
      </Switch>
    </React.Fragment>
  );
}

export default App;
