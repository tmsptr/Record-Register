const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { devNull } = require('os');
const path = require('path');
const Record = require('./models/record');
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/recordRegister');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECT ERR'));
db.once('open', () => {
    console.log('DB CONNECTED TO RR');
})

app.use(express.urlencoded({ extended: true })) // middleware for parsing application/x-www-form-urlencoded
app.use(methodOverride('_method'));//string that we want to use
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.render('./home');
})

app.get('/index', async(req, res) => {
    const records = await Record.find({});
    res.render('./index', {records});
})

app.get('/new', (req, res) => {
    res.render('./new');
})

app.get('/:id', async (req, res) => {
    const record = await Record.findById(req.params.id);
    console.log(record);
    res.render('./show', {record});
});

app.listen(3888, () => {
    console.log('LISTENING TO PORT 3888');
})