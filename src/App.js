import React from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

import Home from "./containers/Home/Home"
import Login from "./containers/Login/Login"
import Register from "./containers/Login/Register"

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Redirect to="/404" />
      </Switch>
    </Router>
  )
}
