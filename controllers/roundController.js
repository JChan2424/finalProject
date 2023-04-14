const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true, coerceTypes: true, useDefaults:'empty'});
require("ajv-keywords")(ajv);
require("ajv-formats")(ajv);
require("ajv-errors")(ajv);

const { Round } = require('../models/Round.js')
const { Song } = require('../models/Song.js');

const { getRoundValidator, postRoundValidator } = require('../validators/roundValidation.js');

const getRound = (req,res)=>{ 
    console.log(req.songName)
    //Compare request data to a schema and return any errors
    const validateGet = ajv.compile(getRoundValidator);
    let getErrors = validateGet(req.query); 
    if(getErrors != null && validateGet.errors != null) {
        console.log(validateGet.errors)
        return res.send(validateGet.errors);
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
        return trimmedArray;
    }
    
    // Find songs whose fullCombo property matches the fullCombo property sent in the request query.
    // Precondition: The results parameter is not null
    // Postcondition: An array of rounds matching the requested combo. 
    const findRoundsWithCombo = (results) => {
        
        let roundArray = [];
        results.forEach(song=>{
            song.rounds.forEach(round => {
                if(round.fullCombo == req.query.fullCombo) {
                    roundArray.push(round);
                }
            })
        })
        return roundArray;
    }
   
    if(req.query.songName && !req.query.fullCombo) { // Request has just the name
        let arrayOfRounds = []; //Store the rounds here
        let trimmedArray = []; // Array trimmed to no more than 10 elements
        Song.find({"name":req.query.songName}).exec()
        .then(results=>{
            if(!results) {
                res.status(404).send("No rounds associated with this song found.")
            }
            else {
                results.forEach(song=>{
                    song.rounds.forEach(round=>{
                        arrayOfRounds.push(round);
                    })
                })
                trimmedArray = trimToTenElements(arrayOfRounds);
                res.status(200).send(trimmedArray);
            }
        })
        .catch(error=>{
            res.status(500).send(error)
        })
    }
    else if(!req.query.songName && req.query.fullCombo) {
        //Find all songs, then for each song, add the rounds stored in them to an array of all rounds
        //Then, try to sort the array date, then return the most recent 10
        let roundArray = [];
        let trimmedArray = [];
        Song.find({}).exec()
        .then(results=>{
            if(results.length <= 0) { // No songs matching the given name
                res.status(404).send("No songs found"); 
            }
            else {
                roundArray = findRoundsWithCombo(results);
                if(roundArray.length <= 0) {
                    res.status(404).send(`No songs found`)
                }
                else {
                    trimmedArray = trimToTenElements(roundArray);
                    res.status(200).send(trimmedArray);
                }
            }
        });
        
    }
    else if(req.query.songName && req.query.fullCombo) {
        let roundArray = [];
        let trimmedArray = [];
        Song.find({"name":req.query.songName}).exec()
        .then(results=>{
            if(results.length <=0) {
                res.status(404).send("No songs found");
            }
            else {
                roundArray = findRoundsWithCombo(results);
                if(roundArray.length <= 0) {
                    res.status(404).send("No songs found");
                }
                else {
                    trimmedArray = trimToTenElements(roundArray);
                    res.send(trimmedArray);
                }            
            }
        })
        .catch(error=>{
            res.send(error);
        });
    }
    else if ((!req.query.songName && !req.query.fullCombo) || (req.query.songName == undefined && req.query.fullCombo == undefined)) {
        res.status(404).send("No songs found"); 
    }
    
    else {
        res.status(500).send("An error occurred");
    }
};

const postRound = (req,res)=>{
    //Compare request data to a schema and return any errrors
    const validatePost = ajv.compile(postRoundValidator);
    let postErrors = validatePost(req.body); 
    if(postErrors != null && validatePost.errors != null) {
        console.log(validatePost.errors);
        return res.send(validatePost.errors);
    }
    
    Song.findOne({"name":req.body.songName}).exec()
    .then(result =>{
        if(!result) {
            res.status(404).send(result);
        }
        else {
            let foundSong = result;
            const date = new Date();
           
            let newRound = {
                songName:req.body.songName,
                difficulty:req.body.difficulty,
                level:req.body.level,
                score:req.body.score,
                fullCombo:req.body.fullCombo,
                comments:req.body.comments,
                dateEntered:date
            };
            foundSong.rounds.push(newRound);
            foundSong.save()
            .then(results=>{
                res.status(201).send(newRound);
            })
            .catch(error=>{
                res.status(500).send(error);
            });
        }
    });
};

module.exports = {
    getRound,
    postRound
};