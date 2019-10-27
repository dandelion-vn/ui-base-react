const fs = require('fs');
const path = require('path');
const url = require('url');

/**
 * Make sure any symlinks in the project folder are resolved:
 * @see https://github.com/facebookincubator/create-react-app/issues/637
 */
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;
const envAppVersion = process.env.VERSION;

function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith('/');
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } if (!hasSlash && needsSlash) {
    return `${path}/`;
  } 
  return path;
  
}

const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage;

const getAppVersion = appPackageJson =>
  envAppVersion || require(appPackageJson).version;

/**
 * We use `PUBLIC_URL` environment variable or "homepage" field to infer
 * "public path" at which the app is served.
 * We can't use a relative path in HTML because we don't want to load something
 * @param appPackageJson
 * @returns {string|*}
 */
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl = envPublicUrl ||
    (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

/**
 * config after eject: we're in ./config/
 */
module.exports = {
  dotenv: resolveApp('.env'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.tsx'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveApp('src/setupTests.ts'),
  appNodeModules: resolveApp('node_modules'),
  appTsConfig: resolveApp('tsconfig.json'),
  appTsLint: resolveApp('tslint.json'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  appVersion: getAppVersion(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json'))
};