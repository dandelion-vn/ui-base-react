import {fetchUtil} from "@src/lib/util";
import config from "@src/conf/config";

function handleErrors(err, action, next) {
  next({
    type: `${action.type}_FAILED`,
    payload: err,
    meta: action.meta,
  });
  return Promise.reject(err);
}

function handleResponse(res, action, next) {
  next({
    type: `${action.type}_SUCCESSFUL`,
    payload: res,
    meta: action.meta,
  });
  return res;
}

export const apiService = () => (next) => (action) => {
  const result = next(action);
  if (!action.meta || !action.meta.async) {
    return result;
  }
  const {path, method = "GET", body, header} = action.meta;

  if (!path) {
    throw new Error(`'path' not specified for async action ${action.type}`);
  }

  const url = `${config.api.COMMON}${path}`;
  return fetchUtil(url, method, body, header).then(
    res => handleResponse(res, action, next),
    err => handleErrors(err, action, next),
  );
};