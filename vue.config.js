module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production' ? '/weather-forecast/' : '/',
  devServer: {
    proxy: 'https://wowchiou.github.io/weather-forecast/',
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = '台灣縣市天氣預報';
      args[0].description =
        '提供台灣縣市的未來三日(三小時)天氣預報與未來七日天氣預報';
      args[0].keywords = '台灣,縣市,天氣,預報,三日,三小時,七日';
      return args;
    });
  },
};
