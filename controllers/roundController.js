const Round = require('../models/Round.js')

const getByName = (req,res)=>{ // Get the 10 most recent rounds
    if(req.query.name && !req.query.combo) { // Request has just the name
        Round.find({"songName":req.query.name},{ sort: {"dateEntered":-1}}).limit(10).exec()
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
        Round.find({"combo":req.query.combo},{ sort: {"dateEntered":-1}}).limit(10).exec()
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
        Round.find({"name":req.query.name}, {"combo":req.query.combo},{ sort: {"dateEntered":-1}}).limit(10).exec()
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

const postRound = (req,res)=>{
    const date = new Date();
    let entryDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    let newRound = {
        songName:req.body.songName,
        score:req.body.score,
        fullCombo:req.body.combo,
        comments:req.body.comments,
        date:entryDate
    }
    newRound.save()
    .then(result=>{
        res.status(201).send(result);
    })
    .catch(error=>{
        res.status(400).send(error);
    })
}

module.exports = {
    getByName,
    postRound
}