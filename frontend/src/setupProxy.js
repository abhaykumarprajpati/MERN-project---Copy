const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/api/v1/", { target: "http://localhost:5000/", secure: false, })
    );
};

// "proxy": " http://192.168.112.129:5000"


