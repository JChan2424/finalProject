const router = require('express').Router({mergeParams:true});

const { getSong, postSong } = require('../controllers/songController.js');
const validation = require('../validators/songValidation.js');

router.get('/',validation.getSongValidator, getSong);

router.post('/',validation.getSongValidator, postSong);

module.exports = router;