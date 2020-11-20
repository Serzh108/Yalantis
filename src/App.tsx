import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import EmployeesPage from './pages/EmployeesPage/EmployeesPage';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={EmployeesPage} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
