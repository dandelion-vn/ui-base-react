import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {createLogger} from "redux-logger";
import * as reducer from "./provider";
import {apiService} from "./middleware";

export function configStore(initialState) {
  const rootReducer = combineReducers(reducer);
  const loggerMiddleware = createLogger();

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      apiService,
      thunkMiddleware,
      loggerMiddleware
    )
  );
}