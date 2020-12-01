import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import EmployeesPage from './pages/EmployeesPage/EmployeesPage';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/employees" exact component={EmployeesPage} />
        <Redirect to="/employees" />
      </Switch>
    </div>
  );
}

export default App;
