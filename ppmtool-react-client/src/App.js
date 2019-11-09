import React from 'react';
import './App.css';
import Dashboard from './componenets/Dashboard';
import Header from './componenets/Layout/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AddProject from './componenets/Project/AddProject';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/addProject" component={AddProject} />
      </div>
    </Router>
  );
}

export default App;
