import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace/NewPlace";
import UserPlaces from "./places/pages/UserPlaces/UserPlaces";
import MainNav from "./shared/components/Navigation/MainNav/MainNav";

function App() {
  return (
    <Router>
      <MainNav />
      <main>
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/:userId/places">
            <UserPlaces />
          </Route>
          <Route path="/places/new" exact>
            <NewPlace />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
