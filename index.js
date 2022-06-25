const { v4: uuid } = require('uuid');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () =>
    console.log(`API is running on: http://localhost:${port}.`)
);

var memDatas = [{
    id: 1,
    time: new Date(),
    key: "istanbul"
}, {
    id: 2,
    time: new Date(),
    key: "ankara"
}];

app.get('/', (request, response) => {
    // The string we want to display on http://localhost:3000
    response.send('Welcome on the books API! Take a breath and start using it!')
});

app.get('/find', (request, response) => {
    const keyname = request.query.key;
    let found = memDatas.find(x=>x.key===keyname);
    if (memDatas.includes(found))
        return response.json(found);
    else if (keyname.length > 0) {
        let flter = memDatas.map(x=>x.id);
        let nextid = Math.max(...flt) + 1;
        memDatas.push({
            id: nextid,
            time: new Date(),
            key: keyname
        });
        return response.json({ success: true })
    } 
    return response.json({ success: false }) 
});

