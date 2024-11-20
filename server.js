require('dotenv').config()

const express = require('express');
const cors = require('cors');

const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

const PORT = process.env.PROXY_PORT || 3111;

const API_SERVICE_URL = process.env.API_SERVICE_URL;
const TOKEN = process.env.AUTHORIZATION_TOKEN;
const PROXY_PATH = process.env.PROXY_PATH || '/';

app.options('*',(request, response)=>{
    response.set('Access-Control-Allow-Origin','http://localhost:8080');
    response.set('Access-Control-Allow-Credentials',true);
    response.set('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization, mangled');
    response.set('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH');
    response.send();
});

app.use(PROXY_PATH, createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^${PROXY_PATH}`]: '',
    },
    headers: {
        'access-control-allow-origin': 'http://localhost:8080',
    }
}));

app.use(cors({
    origin: '*'
}))

app.listen(PORT, () => {
    console.log(`Proxy server started on port ${PORT}`);
});
