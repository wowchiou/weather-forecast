module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  transform: {
    "^.+\\.vue$": "vue-jest",
  },
  testMatch: ["**/src/**/*.spec.[jt]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "/template/"],
};
