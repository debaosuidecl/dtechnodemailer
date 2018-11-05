const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use('/', require('./routes/contact-form'));


const port = 3000 || process.env.PORT;

app.listen(port, ()=> {
    console.log(`app started on ${port}`)
});


