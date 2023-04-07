const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let { roundSchema } = require('./Round.js');

const songSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    group:{
        type:String,
        required:true
    },
    rounds:[roundSchema]
})

let Song = mongoose.model('Song', songSchema);
module.exports = {
    Song,
    songSchema
}