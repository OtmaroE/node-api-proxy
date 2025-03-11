require('dotenv').config()

const express = require('express');
const axios = require('axios')

const app = express();

const PORT = process.env.PROXY_PORT || 3111;

const API_SERVICE_URL = process.env.API_SERVICE_URL;

app.options('*',(request, response)=>{
    response.set('Access-Control-Allow-Origin','http://localhost:8080');
    response.set('Access-Control-Allow-Credentials',true);
    response.set('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization, mangled');
    response.set('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH');
    response.send();
});

app.all('*', async (req, response) => {
    response.set('Access-Control-Allow-Origin','http://localhost:8080');
    response.set('Access-Control-Allow-Credentials',true);
    response.set('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization, mangled');
    response.set('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH');

    if (req.method === 'OPTIONS') {
        response.send();
    } else {
    let dataResponse;
    try {
        dataResponse = await axios({
            url: API_SERVICE_URL + req.url,
            method: req.method,
            json: req.body,
            headers: {
                Authorization: req.headers.authorization,
            },
        });
        dataResponse = dataResponse.data;
    } catch(err) {
        response.status(err.status);
        dataResponse = err.response.data;
        console.log(err.response.data);
    }
    response.send(dataResponse);
}
})

app.listen(PORT, () => {
    console.log(`Proxy server started on port ${PORT}`);
});
