const path = require("path");

module.exports = {
  style: {
    postcssOptions: {
      plugins: [
        require("tailwindcss"),
        require("autoprefixer"),
      ],
    },
  },
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      // This replaces the deprecated onBeforeSetupMiddleware and onAfterSetupMiddleware
      return middlewares;
    },
  },
};
