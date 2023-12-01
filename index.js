const dotenv = require('dotenv');
// const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');

dotenv.config({ path: './config.env' });

require('./db/conn');

app.use(express.json());

// Use the cors middleware to enable CORS
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://dataeinstein.co.in');
    next();
});

const corsOptions = {
    origin: '*', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204, // Some legacy browsers (IE11) choke on 204
};

app.use(cors(corsOptions));

const PORT = process.env.PORT;
// const user = require('./model/userSchema');

app.use(require('./router/auth'))

// const middleware = (req, res, next) => {
//     console.log("this is middleware")
//     next();
// }


app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/about', (req, res) => {
    console.log("hello my about section reader")
    res.send('Hello about world');
});

app.get('/contact', (req, res) => {
    res.send('Hello contact world');
});

app.get('/courses', (req, res) => {
    res.send('Hello courses world');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${ PORT }`);
});