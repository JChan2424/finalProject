const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true, coerceTypes: true, useDefaults:'empty'});
require("ajv-keywords")(ajv);
require("ajv-formats")(ajv);
require("ajv-errors")(ajv);

// Validator for form data used to create new rounds

const postRoundValidator = {
    
    type: 'object',
    properties: {
        songName: {
            // The name of the song
            type:'string',
            minLength:1,
            maxLength: 150,
            errorMessage: 'Could not enter song name. Please try again'
        },
        difficulty: {
            // Difficulty of the song
            enum:["easy", "normal", "hard", "expert", "master"],
            errorMessage: 'Unrecognized difficulty. Please try again.'
        },
        level: {
            // The song level (ex. Lv. 14)
            type: 'number',
            minimum: 5, // The lowest level in game is currently 5. This is unlikely to change.
            maximum: 45, // Projected absolute maximum. 
            errorMessage: 'Invalid song level entered. Please try again.'
        },
        score: {
            // The score achieved after completing a round
            type: 'number',
            minimum: 0,
            errorMessage:'Invalid score entered. Please try again.'
        },
        fullCombo: {
            // If a Full Combo (round with no GOOD or lower taps recorded) is achieved
            type:'boolean',
            default:false,
            errorMessage:'Unrecognized type of combo. Please try again.'
        },
        comments: {
            type:'string',
            maxLength: 250
        }
    },
    required: ['songName', 'difficulty', 'level', 'score'],
    additionalProperties:true,
    errorMessage: {
        required: {
            songName:'Please ensure that you have entered a song name',
            difficulty:'Please ensure that you have selected a difficulty',
            level:'Please ensure that you entered a level.',
            score:'Please ensure that you entered a score.'
        }
    }
}


// Validator for GET requests. Used for validating form data used to search for rounds
const getRoundValidator = {
        type: 'object',
        properties: {
            songName: {
                type:'string',
                errorMessage: 'Could not enter song name. Please try again.'
            },
            fullCombo: {
                type:'boolean',
                default: false,
                errorMessage: 'Invalid combo. Please try again'
            }
        }
    };

module.exports = {
    postRoundValidator,
    getRoundValidator
}