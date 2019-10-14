const dev = {
  api: {
    COMMON: "https://domain.com.vn/api",
    LOGIN_GOOGLE: "https://domain.com.vn/api/login/google",
    LOGIN_FACEBOOK: "https://domain.com.vn/api/login/facebook"
  },
  google: {
    CLIENT_ID: "99216094371-7c87hc7lsofjrhj8loi5fdbfo48m42el.apps.googleusercontent.com"
  },
  redirect: {
    REDIRECT_AFTER_LOGGED_IN: "/"
  }
};

const localhost = {
  api: {
    COMMON: "http://localhost:8081/api",
    LOGIN_GOOGLE: "http://localhost:8081/api/login/google",
    LOGIN_FACEBOOK: "http://localhost:8081/api/login/facebook"
  },
  google: {
    CLIENT_ID: "99216094371-7c87hc7lsofjrhj8loi5fdbfo48m42el.apps.googleusercontent.com"
  },
  redirect: {
    REDIRECT_AFTER_LOGGED_IN: "/"
  }
};

const prod = {
  api: {
    COMMON: "/api",
    LOGIN_GOOGLE: "/api/login/google",
    LOGIN_FACEBOOK: "/api/login/google"
  },
  google: {
    CLIENT_ID: "99216094371-7c87hc7lsofjrhj8loi5fdbfo48m42el.apps.googleusercontent.com"
  },
  redirect: {
    REDIRECT_AFTER_LOGGED_IN: '/'
  }
};

let config;
console.log("stage: " + process.env.REACT_APP_STAGE);
switch (process.env.REACT_APP_STAGE) {
  case "production":
    config = prod;
    break;
  case "localhost":
    config = localhost;
    break;
  default:
    config = dev
}

export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
}
