import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes as Switch } from 'react-router-dom';
import Task from './pages/Task';


function App() {
    return(
      <Router>
        <Switch>
          <Route path="/" element={<Task/>}/>
        </Switch>
      </Router>

    );
 }

export default App;
