import React, {Component} from "react";
import {Switch} from "react-router-dom";
import {routes} from "@src/conf/routes";
import {RouteWithSubRoutes} from "@src/app/component";

class App extends Component {
  render() {
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

export default App;