const router = require('express').Router({mergeParams:true});

const { getRound, postRound } = require('../controllers/roundController.js');
// const validation = require('../validators/roundValidation.js');


// router.get('/',validation.getRoundValidator, getRound); 

router.get('/', getRound); 

router.post('/', postRound);

module.exports = router;

