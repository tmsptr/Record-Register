const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
    artistName: String,
    recordName: String,
    recordYear: Number
})

module.exports = mongoose.model('Record', RecordSchema);