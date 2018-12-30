const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;
const app = express();
const router = express.Router();

app.use(bodyParser.json());

// mongoose.connect('mongodb://localhost/react-test');


app.listen(port, ()=> console.log('Listening on port ${port}'));