module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production' ? '/weather-forecast/' : '/',
  devServer: {
    proxy: 'https://wowchiou.github.io/weather-forecast/',
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = '';
      args[0].description = '';
      args[0].keywords = '';
      return args;
    });
  },
};
