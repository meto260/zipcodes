const { v4: uuid } = require('uuid');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.port || 8080;
app.use(bodyParser.urlencoded({ extended: true }));
const QueryFilter = require('./QueryFilter.js');

app.listen(port, () => {
    console.log(`API is running on: http://localhost:${port}.`);
});

app.get('/', (request, response) => {
    response.send('Welcome on the zipcode API! Take a breath and start using it!')
});

app.get('/q', async (request, response)=>{
    let result = await new QueryFilter().searchInCodes(request.query);
    return response.json(result);
});

app.get('/find', (request, response) => {
    let result = new QueryFilter().findInList(request.query);
    return response.json(result);
});