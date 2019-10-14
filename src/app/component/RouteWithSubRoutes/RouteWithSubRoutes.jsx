import React from "react";
import {Route} from "react-router-dom";
import {PrivateRoute} from "@src/app/component";

export const RouteWithSubRoutes = (route) => !route.auth ? (
  <Route
    path={route.path}
    render={props => (
      <route.component {...props} routes={route.routes}/>
    )}
  />
) : <PrivateRoute {...route}/>;