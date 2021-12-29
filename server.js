const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

const PORT = process.env.PORT || 3111;

const API_SERVICE_URL = process.env.SERVICE_URL || 'http://localhost:3443/api';

app.use('/forms/v1', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/forms/v1`]: '',
    },
}));

app.listen(port, () => {
    console.log('Proxy server started');
});
