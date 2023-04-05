const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true, coerceTypes: true, useDefaults:'empty'});
require("ajv-keywords")(ajv);
require("ajv-formats")(ajv);
require("ajv-errors")(ajv);

// Validator for form data used to create new songs
const postSongValidator = (req, res, next) => {
    let schema = {
        type:'object',
        properties: {
            // Name of the song
            name: {
                type:'string',
                errorMessage:'Could not enter song name. Please try again.'
            },
            group: {
                enum: ['VS','L/N','MMJ','VBS','WXS','N25','other'],
                errorMessage:'Unknown group. Please try again.'
            }
        },
        required:['name', 'group'],
        additionalProperties: true,
        errorMessage: {
            required: {
                name:'Please ensure you have entered a song name',
                group:'Please ensure that you have entered a group name'
            }
        }
    }
    const validatePostSong = ajv.complie(schema);
    validatePostSong(req.body);
    res.locals.postSongErrors = validatePostSong.errors;
    next();
}

// Validator for GET Requests. Used for validating form data used to search for a song
const getSongValidator = (req,res,next) => {
    let schema = {
        type: 'object',
        properties: {
            name: {
                type:'string',
                errorMessage: 'Could not enter song name. Please try again.'
            },
            combo: {
                type:'boolean',
                errorMessage: 'Invalid combo. Please try again'
            }
        }
    }
    const validateGetSong = ajv.complie(schema);
    validateGetSong(req.query);
    res.locals.getSongErrors = validateGetSong.errors;
    next();
}

module.exports = {
    postSongValidator,
    getSongValidator
}