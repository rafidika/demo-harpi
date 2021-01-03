import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Form from './components/Form';
import Admin from './components/Admin'
import SignIn from './components/SignIn';
import Register from './components/Register'

function App() {
  return (
    <React.Fragment>
      <Switch>
        {/* <Route path="/id" component={IdCard}/> */}
        <Route path="/45jPyQvLRE" component={Register}/>
        <Route path="/signin" component={SignIn}/>
        <Route path="/admin" component={Admin}/>
        <Route exact path="/" component={Form}/>
      </Switch>
    </React.Fragment>
  );
}

export default App;
