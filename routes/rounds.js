const router = require('express').Router({mergeParams:true});

const { getByName, getByCombo, postRounds } = require('../controllers/roundController.js');


router.get('/:name', getByName); 
router.get('/full-combo', getByCombo);
router.post('/', postRounds);

module.exports = router;

