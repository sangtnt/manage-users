import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import Cms from "./Cms"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
function App() {
  return (
    <div>
      <Router>
        <ReactNotification />
        <Switch>
          <Route path="/">
            <Cms/>  
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
