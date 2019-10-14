import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import "@src/style/site.css"
import {App} from "@src/app/container";
import {history} from "@src/lib/helper";
import {configStore} from "@src/store"

const store = configStore(
  window.REDUX_INITIAL_DATA
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App/>
    </Router>
  </Provider>,
  document.getElementById("t")
);