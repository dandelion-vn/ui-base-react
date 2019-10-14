import React from "react";
import {Redirect, Route} from "react-router-dom";
import {isLoggedIn, userLogout} from "@src/lib/helper";
import {pathConstant} from "@src/constant";

export const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={props => {
    if (!isLoggedIn()) {
      userLogout();
      return <Redirect to={{pathname: pathConstant.SIGN_IN, state: {from: props.location}}}/>
    }
    return <Component {...props} />
  }}/>
);