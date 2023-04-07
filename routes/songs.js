const router = require('express').Router({mergeParams:true});

const { getSong, postSong } = require('../controllers/songController.js');


router.get('/', getSong);

router.post('/', postSong);

module.exports = router;