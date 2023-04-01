// const axios = require('axios');
const Song = require('../models/Song.js');

const getSong = (req,res)=>{
    if(req.query.name && !req.query.combo) { // Request has just the name
        Song.find({"name":req.query.name}).exec()
        .then(results=>{
            if(!results) { // No songs matching the given name
                res.status(404).send("No songs found"); // 404 vs. 204
            }
            else {
                res.status(200).send(results)
            }
        })
        .catch(error=>{
            res.status(500).send(error) // depends on the response received
        })
    }
    else if(!req.query.name && req.query.combo) {
        Song.find({"combo":req.query.combo})
        .then(results=>{
            if(!results) { // No songs matching the given name
                res.status(404).send("No songs found"); // 404 vs. 204
            }
            else {
                res.status(200).send(results)
            }
        })
        .catch(error=>{
            res.status(500).send(error) // depends on the response received
        })
        
    }
    else if(req.query.name && req.query.combo) {
        Song.find({"name":req.query.name, "combo":req.query.combo})
        .then(results=>{
            if(!results) { // No songs matching the given name
                res.status(404).send("No songs found"); // 404 vs. 204
            }
            else {
                res.status(200).send(results)
            }
        })
        .catch(error=>{
            res.status(500).send(error) // depends on the response received
        })
    }
}
// const getByName = (req,res)=>{ // Get a song by name
    
// }

// const getByCombo = (req,res)=>{ // If the song name box is empty get distinct songs with or without a full combo
    
// }

// const getByComboAndName = (req,res)=>{ // If a name and combo is given 
    
// }

const postSong = (req,res)=>{
    // Check if song exists first using .find
}

module.exports = {
    getSong,
    // getByName,
    // getByCombo,
    // getByComboAndName,
    postSong
}