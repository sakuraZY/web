import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const modulesFiles = require.context('./modules', true, /\.js$/);
const modules = modulesFiles.keys().reduce((objModule, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  return {
    ...objModule,
    [moduleName]: value.default,
  };
}, {});

export default new Vuex.Store({
  modules,
});
