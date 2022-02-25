import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes as Switch } from 'react-router-dom';
import TaskPage from './pages/TaskPage';


function App() {
    return(
      <Router>
        <Switch>
          <Route path="/" element={<TaskPage/>}/>
        </Switch>
      </Router>

    );
 }

export default App;
