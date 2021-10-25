const historyApiFallback = require('connect-history-api-fallback');
module.exports = {
    proxy: "localhost:8000",
    files: ["**/*.css", "**/*.pug", "**/*.js"],
    ignore: ["node_modules"],
    reloadDelay: 10,
    ui: false,
    notify: false,
    port: 3000,
    server: {
      baseDir: ".",
      middleware: [ historyApiFallback() ]
    },
  };