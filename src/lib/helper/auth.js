const store = localStorage;

export function getRole() {
  console.log("(getRole)");
  try {
    if (store.getItem("user")) {
      let role = store.getItem("user").role;
      console.debug(`(getRole)role: ${role}`);
      return role;
    }

    return "";
  } catch (err) {
    console.error(err.message);
    return "";
  }
}

export function getSubDomain() {
  console.log("(getSubDomain)");
  let domain = window.location.host;
  let parts = domain.split(".");
  if (!parts || parts.length <= 1) {
    return domain;
  }
  return domain.replace(parts[0], "");
}

export function getToken() {
  console.log("(getToken)");
  try {
    if (store.getItem("user")) {
      let token = store.getItem("user").token;
      console.debug(`(getToken)token: ${token}`);
      return token;
    }
    return "";
  } catch (err) {
    console.error(err.message);
    return "";
  }
}

export function isLoggedIn() {
  console.log("(isLoggedIn)");
  let token = getToken();
  if (token) {
    return token.length !== 0;
  } else {
    return false;
  }
}

export function userLogin(user) {
  console.debug(`(userLogin)user: ${JSON.stringify(user)}`);
  store.setItem("user", user);
  store.setItem("user", {
    token: user.accessToken,
    refreshToken: user.information.refreshToken,
    role: user.information.user.userRole
  })
}

export function userLogout() {
  console.log("(userLogout)");
  try {
    store.removeItem("user");
  } catch (err) {
    console.error(err.message);
  }
}
