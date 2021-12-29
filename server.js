require('dotenv').config()

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

const PORT = process.env.PROXY_PORT || 3111;

const API_SERVICE_URL = process.env.SERVICE_URL || 'http://localhost:3443/api';
const TOKEN = process.env.AUTHORIZATION_TOKEN || 'ey.abc.dce';

app.use('/forms/v1', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/forms/v1`]: '',
    },
    headers: {
        authorization: TOKEN,
    }
}));

app.listen(PORT, () => {
    console.log(`Proxy server started on port ${PORT}`);
});
