const router = require('express').Router({mergeParams:true});

const songRouter = require('./songs.js');
const roundRouter = require('./rounds.js');

router.use('/songs', songRouter);
router.use('/rounds', roundRouter);

module.exports = router;