module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/vue3-tailwind-unit-test/" : "/",
  devServer: {
    proxy: "https://wowchiou.github.io/vue3-tailwind-unit-test/",
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "";
      args[0].description = "";
      args[0].keywords = "";
      return args;
    });
  },
};
