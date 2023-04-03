const router = require('express').Router({mergeParams:true});

const { getRound, postRound } = require('../controllers/roundController.js');


router.get('/', getRound); 
// router.get('/full-combo', getByCombo);
router.post('/', postRound);

module.exports = router;

