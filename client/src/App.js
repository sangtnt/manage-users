import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Cms from "./Cms"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
function App() {
  return (
    <div>
      <Router>
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
