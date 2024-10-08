import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, NavLink } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session"

function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  // Allow user session to persist through refreshes by dispatching restoreUser to fetch session information from JWT token cookie
  // and set it onto the Redux store
  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then(() => setIsLoaded(true))
  }, [dispatch])

  return isLoaded && (    // This forces isLoaded to be true prior to rendering page elements
    <Switch>
      <Route path="/" exact>
        <h1>Hello from App</h1>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/login">Log In</NavLink>
      </Route>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route path="/signup">
        <SignupFormPage />
      </Route>
    </Switch>
  );
}

export default App;
