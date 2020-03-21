

const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  transpileDependencies: [
    'js-pinyin',
  ],
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();
  },
  css: {
    loaderOptions: {
      scss: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.scss` 这个文件
        prependData: '@import "~@/styles/variables.scss";@import "~@/styles/common.scss";',
      },
    },
  },

};
