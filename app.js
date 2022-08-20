const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { devNull } = require('os');
const path = require('path');
const Record = require('./models/record');

mongoose.connect('mongodb://localhost:27017/recordRegister');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECT ERR'));
db.once('open', () => {
    console.log('DB CONNECTED');
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/show', async(req, res) => {
    const records = await Record.find({});
    res.render('show', {records});
})

app.get('/new', (req, res) => {
    res.render('new');
})
app.post('/', async (req, res) => {
    const btn = document.querySelector("#button");
const form = document.querySelector("#searchForm");
const list = document.querySelector("#list")

document.querySelector("body").style.backgroundColor = "#f9dcc4";

form.addEventListener("submit", function(e) {
    e.preventDefault();
    //console.dir(form) // to look up query! and other elements
    const query = form.elements.query.value;
    //const query = document.querySelector("#query").value;
    findShow(query);
    form.elements.query.value = "";
    let child = list.lastElementChild;
    while(child) {
        list.removeChild(child);
        child = list.lastElementChild;
    }
})

const findShow = async(name) => {
    const config = { params: {q : name}} // Makes it easir to add API elements, params
    const res = await axios.get(`https://api.tvmaze.com/search/shows?`, config);
    
    for(let i = 0; i < res.data.length; i++) {
        const li = document.createElement("li");
        //console.log(res);
        li.innerText = "Name: " + res.data[i].show.name + " Premiered: " + res.data[i].show.premiered;
        if(res.data[i].show.image) {
            const img = document.createElement("img");
            img.src = res.data[i].show.image.medium;
            list.append(li);
            list.append(img);
        }
    }
}
})

app.listen(3888, () => {
    console.log('LISTENING TO PORT 3888');
})