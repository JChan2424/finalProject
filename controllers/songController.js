// const axios = require('axios');
const { Song } = require('../models/Song.js');

const getSong = (req,res)=>{
    
    // Trim an array so that it only has ten elements.
    // Precondition: The array parameter has been initialized
    // Postcondition: An array consisting of only ten elements
    const trimToTenElements = (arrayToTrim) => {
        let trimmedArray = [];
        let numPushed = 0;
        let i = arrayToTrim.length - 1;
        while(numPushed < 10 && i >= 0) {
            trimmedArray.push(arrayToTrim[i]);
            i--;
            numPushed++;
        }
        return trimmedArray;
    };
    
    const findSongsWithCombo = (results) => {
        let songArray = [];
        results.forEach(song=>{
            song.rounds.forEach(round => {
                if((round.fullCombo == req.query.combo) && songArray.indexOf(song) == -1) {
                    songArray.push(song);
                }
            });
        });
        return songArray;
    };
    
    if(req.query.name && !req.query.combo) { // Request has just the name
        Song.find({"name":req.query.name}).exec()
        .then(results=>{
            if(results.length <= 0) { // No songs matching the given name
                res.status(404).send(results);
            }
            else {
                res.status(200).send(results);
            }
        })
        .catch(error=>{
            res.status(500).send(error); 
        });
    }
    else if(!req.query.name && req.query.combo) { 
        let songArray = [];
        let trimmedArray = [];
        Song.find({}).exec()
        .then(results=>{
            if(results.length <= 0) { // No songs matching the given name
                res.status(404).send(results); 
            }
            else {
                songArray = findSongsWithCombo(results);
                if(songArray.length <= 0) {
                    res.send(songArray);
                }
                else {
                    trimmedArray = trimToTenElements(songArray);
                    res.send(trimmedArray);
                }
                
            }
        });
    }
    else if(req.query.name && req.query.combo) {
        let songArray = [];
        let trimmedArray = [];
        Song.find({"name":req.query.name}).exec()
        .then(results=>{
            if(results.length <= 0) { // No songs matching the given name
                res.send(results); 
            }
            else {
                songArray = findSongsWithCombo(results);
                if(songArray.length <= 0) {
                    res.send(songArray);
                }
                else {
                    trimmedArray = trimToTenElements(songArray);
                    res.send(trimmedArray);
                }
            }
        });
    }
    
    else if (!req.query.songName && !req.query.fullCombo) {
        let emptyResult = [];
        res.send(emptyResult); 
    }
    
    else {
        res.status(500).send("An errror occurred");
    }
};

const postSong = (req,res)=>{
    Song.findOne({"name":req.body.name}, {"group":req.body.group}).exec()
    .then(results=>{
        if(results == null) {
            let newSong = Song({
                name:req.body.name,
                group:req.body.group,
                rounds:[]
            });
            newSong.save()
            .then(result=>{
                res.status(201).send(result);
            })
            .catch(error=>{
                res.status(400).send(error);
            });
        }
        else {
            Song.find({}).exec()
            .then(results => {
                res.send(results);
            })
            .catch(error => {
                res.send(error)
            })
        }
        
    })
    .catch(error=>{
        res.send(error);
    });
};

module.exports = {
    getSong,
    postSong
};