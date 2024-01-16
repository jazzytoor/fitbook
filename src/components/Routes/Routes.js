import React from "react"
import { Switch, Route } from "react-router-dom"

import Home from "../../pages/Home"
import Register from "../../pages/Register"
import Login from "../../pages/Login"
import NotFound from "../../pages/NotFound"
import Dashboard from "../../pages/Dashboard/Dashboard"
import UserProfile from "../../pages/UserProfile"
import ForgotPassword from "../../pages/ForgotPassword"

import PrivateRoute from "../PrivateRoute"

const Routes = ({ userStatus }) => {
  return (
    <Switch>
      <PrivateRoute
        isLoggedIn={userStatus}
        exact
        path="/dashboard"
        component={Dashboard}
      />
      <PrivateRoute
        isLoggedIn={userStatus}
        exact
        path="/profile"
        component={UserProfile}
      />
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/forgotten-password" component={ForgotPassword} />
      <Route component={NotFound} />
    </Switch>
  )
}

export default Routes
