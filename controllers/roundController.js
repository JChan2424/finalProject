const { Round } = require('../models/Round.js')
const { Song } = require('../models/Song.js');
const getRound = (req,res)=>{ // Get the 10 most recent rounds
    
    // Parse the request query to a boolean for comparing to the value in the database
    // Do this in the validator?
    const parseToBoolean = (stringToParse) => {
        // console.log(stringToParse)
        return (stringToParse.toLowerCase() + '' === 'true') 
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
        // console.log(trimmedArray)
        return trimmedArray;
    }
    
    // Find songs whose fullCombo property matches the fullCombo property sent in the request query.
    // Precondition: The results parameter is not null
    // Postcondition: An array of rounds matching the requested combo. 
    const findRoundsWithCombo = (results) => {
        
        let roundArray = [];
        results.forEach(song=>{
            song.rounds.forEach(round => {
                if(round.fullCombo == parseToBoolean(req.query.fullCombo)) {
                    roundArray.push(round);
                }
            })
        })
        return roundArray;
    }
    let parsedCombo;
    if(req.query.fullCombo) {
        parsedCombo = parseToBoolean(req.query.fullCombo);
    }
    if(req.query.songName && !req.query.fullCombo) { // Request has just the name
        let arrayOfRounds = []; //Store the rounds here
        let trimmedArray = []; // Array trimmed to no more than 10 elements
        // console.log(req.query.songName)
        Song.find({"name":req.query.songName}).exec()
        .then(results=>{
            console.log("Get based on name")
            if(!results) {
                res.send("No rounds associated with this song found.")
            }
            else {
                results.forEach(song=>{
                    song.rounds.forEach(round=>{
                        arrayOfRounds.push(round);
                    })
                })
                trimmedArray = trimToTenElements(arrayOfRounds);
                res.send(trimmedArray);
            }
        })
        .catch(error=>{
            res.send(error)
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
                let comboStatus = "";
                if(parsedCombo) { // If the user is looking for rounds with a full combo
                    comboStatus = "full-combo";
                }
                else { // If the user is looking for rounds without a full combo
                    comboStatus = "not full-combo";
                }
                roundArray = findRoundsWithCombo(results);
                if(roundArray.length <= 0) {
                    res.send(`No songs found`)
                }
                else {
                    trimmedArray = trimToTenElements(roundArray);
                    res.send(trimmedArray);
                }
            }
        });
        
    }
    else if(req.query.songName && req.query.fullCombo) {
        console.log("Get by name and combo");
        let roundArray = [];
        let trimmedArray = [];
        Song.find({"name":req.query.songName}).exec()
        .then(results=>{
            if(results.length <=0) {
                res.send("No songs found");
            }
            else {
                let comboStatus = "";
                if(parsedCombo) { // If the user is looking for rounds with a full combo
                    comboStatus = "full-combo";
                }
                else { // If the user is looking for rounds without a full combo
                    comboStatus = "not full-combo";
                }
                roundArray = findRoundsWithCombo(results);
                if(roundArray.length <= 0) {
                    res.send(`No songs ${comboStatus}ed found.`);
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
        res.send("No songs found"); 
    }
    
    else {
        res.status(500).send("An error occurred");
    }
};

const postRound = (req,res)=>{
    Song.findOne({"name":req.body.songName}).exec()
    .then(result =>{
        if(!result) {
            res.send(result);
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
                res.send(newRound);
            })
            .catch(error=>{
                res.send(error);
            });
        }
    });
};

module.exports = {
    getRound,
    postRound
};