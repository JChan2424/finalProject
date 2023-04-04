// const axios = require('axios');
const { Song } = require('../models/Song.js');

const getSong = (req,res)=>{
    console.log("get")
    const parseToBoolean = (stringToParse) => {
        return (req.query.combo.toLowerCase() + '' === 'true') 
    }
    
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
        console.log(trimmedArray)
        return trimmedArray;
    }
    
    // Find songs whose fullCombo property matches the fullCombo property sent in the request query.
    // Precondition: The results parameter is not null
    // Postcondition: An array of rounds matching the requested combo. 
    const findSongsWithCombo = (results) => {
        let songArray = [];
        results.forEach(song=>{
            song.rounds.forEach(round => {
                // console.log(round.fullCombo == (parseToBoolean(req.query.combo)));
                if(round.fullCombo == (parseToBoolean(req.query.combo)) && songArray.indexOf(song) == -1) {
                    // console.log(song);
                    songArray.push(song);
                }
            })
        })
        return songArray;
    }
    let parsedCombo = parseToBoolean(req.query.combo);
    if(req.query.name && !req.query.combo) { // Request has just the 
        console.log("Search by name")
        Song.find({"name":req.query.name}).exec()
        .then(results=>{
            if(results.length <= 0) { // No songs matching the given name
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
        let songArray = [];
        let trimmedArray = [];
        Song.find({}).exec()
        .then(results=>{
            if(results.length <= 0) { // No songs matching the given name
                res.status(404).send("No songs found"); // 404 vs. 204
            }
            else {
                let comboStatus = "";
                if(parsedCombo) { // If the user is looking for rounds with a full combo
                    comboStatus = "full-combo";
                }
                else { // If the user is looking for rounds without a full combo
                    comboStatus = "not full-combo";
                }
                songArray = findSongsWithCombo(results);
                if(songArray.length <= 0) {
                    res.send(`No songs ${comboStatus}ed found.`)
                }
                else {
                    trimmedArray = trimToTenElements(songArray);
                    res.send(trimmedArray)
                }
                
            }
        })
    }
    else if(req.query.name && req.query.combo) {
        let songArray = [];
        let trimmedArray = [];
        Song.find({"name":req.query.name}).exec()
        .then(results=>{
            if(results.length <= 0) { // No songs matching the given name
                res.status(404).send("No songs found"); // 404 vs. 204
            }
            else {
                let comboStatus = "";
                if(parsedCombo) { // If the user is looking for rounds with a full combo
                    comboStatus = "full-combo";
                }
                else { // If the user is looking for rounds without a full combo
                    comboStatus = "not full-combo";
                }
                songArray = findSongsWithCombo(results);
                if(songArray.length <= 0) {
                    res.send(`No songs ${comboStatus}ed found.`)
                }
                else {
                    trimmedArray = trimToTenElements(songArray);
                    res.send(trimmedArray)
                }
            }
        })
    }
    else {
        res.status(500).send("An errror occurred");
    }
}

const postSong = (req,res)=>{
    Song.findOne({"name":req.body.name}, {"group":req.body.group}).exec()
    .then(results=>{
        console.log(results)
        if(results == null) {
            console.log("No duplicates")
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
            res.send("This song already exists. Please try adding another.")
        }
        
    })
    .catch(error=>{
        res.send(error);
    })
};

module.exports = {
    getSong,
    postSong
};