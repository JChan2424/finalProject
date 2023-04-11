const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true, coerceTypes: true, useDefaults:'empty'});
require("ajv-keywords")(ajv);
require("ajv-formats")(ajv);
require("ajv-errors")(ajv);

// Validator for form data used to create new songs
const postSongValidator = {
    type:'object',
    properties: {
        // Name of the song
        name: {
            type:'string',
            minLength: 1,
            maxLength:150,
            errorMessage:'Could not enter song name. Please try again.'
        },
        // Group that performed the song
        group: {
            enum: ['VS','L/N','MMJ','VBS','WXS','N25','other'],
            errorMessage:'Unknown group. Please try again.'
        }
    },
    required:['name', 'group'],
    additionalProperties: true,
    errorMessage: {
        required: {
            name:'Please ensure you have entered a song name.',
            group:'Please ensure that you have entered a group name.'
        }
    }
}

// Validator for GET Requests. Used for validating form data used to search for a song
const getSongValidator = {
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

module.exports = {
    postSongValidator,
    getSongValidator
}