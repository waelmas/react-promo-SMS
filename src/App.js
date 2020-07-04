import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SMSForm from './SMSForm';
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect, withRouter } from 'react-router-dom';

class App extends Component {
  
  render() {
    return (
      
      <Router>
        
        <Route exact={true} path="/" render={() => (
          <div>
              <SMSForm />
          </div>
        )}>
        </Route>
        <Route path="/success" render={() => (
          <div>
          <img src="success.png" className="result" alt="success" />
              <p>SMS with the promo code was sent to your number.</p>
          </div>
        )}></Route>
        <Route path="/error" render={() => (
          <div>
          <img src="error.png" className="result" alt="error" />
            <p>Oops.. Something went wrong :(</p>
              </div>
        )}></Route>
      </Router>
    );
  }
}

export default App;