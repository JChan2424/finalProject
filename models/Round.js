const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roundSchema = new Schema({
    songName: {
        type:String,
        required:true,
    },
    difficulty:{
        type:String,
        required: true
    },
    rank:{
        type:Number,
        required:true
    },
    score: {
        type:Number,
        required:true
    },
    fullCombo: {
        type:Boolean,
        default:false
    },
    comments: {
        type:String, 
        maxLength:500
    },
    dateEntered: {
        type: Date
    }
    
})

const Round = mongoose.model('Round', roundSchema);

module.exports = {
    Round,
    roundSchema
}

