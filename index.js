const { v4: uuid } = require('uuid');
const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(express.static('wwwroot'))

const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
const QueryFilter = require('./QueryFilter.js');

app.listen(port, () => {
    console.log(`API is running on: http://localhost:${port}.`);
});

app.get('/', async (request, response)=>{
    response.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/q', async (request, response)=>{
    let result = await new QueryFilter().searchInCodes(request.query);
    return response.json(result);
});

app.get('/find', (request, response) => {
    let result = new QueryFilter().findInList(request.query);
    return response.json(result);
});