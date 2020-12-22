'use strict';

const path = require('path');
const fs = require('fs');
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');

// 项目根目录
// process.cwd() 方法会返回 Node.js 进程的当前工作目录。
// fs.realpathSync() 方法会返回解析后的路径，它会解析如.. .之类的符号
const appDirectory = fs.realpathSync(process.cwd());
// 生成绝对路径的方法
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// 所有资源的公共访问：/
const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  // 用commonjs引入一个json文件就相当于直接引入了一个对象
  // 如果有homepage，那么公开路径就是一homepage开头
  require(resolveApp('package.json')).homepage,
  // 或者去环境变量中找PUBLIC_URL这个变量
  process.env.PUBLIC_URL
  // 如果都没有，那么默认是以 / 开头
);

// 文件扩展名
const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension =>
    // fs.existsSync() 如果路径存在，则返回 true，否则返回 false。
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

// 路径
module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  proxySetup: resolveApp('src/setupProxy.js'),
  appNodeModules: resolveApp('node_modules'),
  swSrc: resolveModule(resolveApp, 'src/service-worker'),
  publicUrlOrPath,
};



module.exports.moduleFileExtensions = moduleFileExtensions;
