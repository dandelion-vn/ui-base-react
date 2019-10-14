import React, {Component} from 'react';
import {RouteWithSubRoutes} from "@src/app/component";
import {Switch} from "react-router-dom";

class Auth extends Component {
  render() {
    const {routes} = this.props;
    return (
      <React.Fragment>
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </React.Fragment>
    );
  }
}

export default Auth;