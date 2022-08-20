const mongoose = require('mongoose');
const Record = require('../models/record');
const records = require('./records');

mongoose.connect('mongodb://localhost:27017/recordRegister');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECT ERROR'));
db.once('open', () => {
    console.log('DB CONNECTED');
})

const seedDB = async() => {
    await Record.deleteMany({});
    for(let i = 0; i < records.length; ++i) {
        const rec = new Record({
            artistName: `${records[i].name}`,
            recordName: `${records[i].title}`,
            recordYear: `${records[i].year}`
        })
        await rec.save();
    }
}

seedDB();
