module.exports = {
  publicPath: './',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
    port: 3012,
  },
  css: {
    // modules: false,
    extract: true,
    sourceMap: false,
  },
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = '开始吧~';
        return args;
      });
  },
};
