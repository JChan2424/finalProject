const router = require('express').Router({mergeParams:true});

const { getByName, getByCombo, getByComboAndName, postSong } = require('../controllers/songController');

// do I have to have a / route 
// use a / route themn, key value to search db (comes from req.query)
// ex. if req.query for name != null and combo = null, just look for docs matching the name. if both are true, find docs with matching name and parameter
router.get('/:name', getByName);
// router.get('/:combo', getByCombo);
// router.get('/:combo:name', getByComboAndName);// How to do using query
router.post('/', postSong);