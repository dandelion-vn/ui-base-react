import axios from "axios";
import {getToken, userLogout} from "../helper/auth";

export function fetchUtil(url, method, body, header) {
  const requestOptions = {
    url,
    method,
    headers: header ? header : requestHeader(),
    body: method === "POST" ? body : null,
  };
  log.debug(`(fetchUtil)requestOptions: ${requestOptions.json()}`);

  return axios(requestOptions).then(res => parseStatus(res.status, res.data.json()));
}

function requestHeader() {
  let token = getToken();
  console.debug(`(requestHeader)token: ${token}`);
  if (token) {
    return {
      "Content-Type": "application/x-www-form-urlencoded",
      "token": token
    };
  }
  return {
    "Content-Type": "application/json",
  };
}

function parseStatus(status, res) {
  console.debug(`(parseStatus)status: ${status}, res: ${res}`);
  return new Promise((resolve, reject) => {
    if (status >= 200 && status < 300) {
      res.then(response => resolve(response));
    } else if (status === 403 || status === 401) {
      userLogout();
      res.then(response => reject({
        status,
        response
      }));
    } else {
      res.then(response => reject({
        status,
        response
      }));
    }
  });
}