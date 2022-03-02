require('dotenv').config()

const express = require('express');
const cors = require('cors');

const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

const PORT = process.env.PROXY_PORT || 3111;

const API_SERVICE_URL = process.env.API_SERVICE_URL;
const TOKEN = process.env.AUTHORIZATION_TOKEN;
const PROXY_PATH = process.env.PROXY_PATH || '/';

app.use(PROXY_PATH, createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^${PROXY_PATH}`]: '',
    },
    headers: {
        authorization: TOKEN,
    }
}));

app.use(cors({
    origin: '*'
}))

app.listen(PORT, () => {
    console.log(`Proxy server started on port ${PORT}`);
});
