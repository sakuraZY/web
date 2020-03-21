/*
 * @File: 统一输出
 * @Author: wuhy 
 * @Date: 2020-03-17 10:24:15 
 * @Last Modified by: wuhy
 * @Last Modified time: 2020-03-17 12:33:35
 */
const modulesFiles = require.context('./modules', true, /\.js$/);
const reqModules = modulesFiles.keys().reduce((objModule, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  return {
    ...objModule,
    ...value.default,
    [moduleName]: value.default,
  };
}, {});

export default reqModules;
