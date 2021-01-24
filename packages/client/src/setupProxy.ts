const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app: any) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://localhost:8080",
      pathRewrite: {
        "^/api": "/",
      },
    })
  );
};

export {};
