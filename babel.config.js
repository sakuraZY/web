module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: '~src/plugins/element/theme',
      },
    ],
    [
      'import',
      {
        libraryName: 'vxe-table',
        style: true,
      },
    ],
  ],
};
