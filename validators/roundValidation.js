const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true, coerceTypes: true, useDefaults:'empty'});
require("ajv-keywords")(ajv);
require("ajv-formats")(ajv);
require("ajv-errors")(ajv);

// Validator for form data used to create new rounds
const postRoundValidator = (req, res, next) => {
    let schema = {
        type: 'object',
        properties: {
            songName: {
                // The name of the song
                type:'string',
                errorMessage: 'Could not enter song name. Please try again'
            },
            difficulty: {
                // Difficulty of the song
                enum:["easy", "normal", "hard", "expert", "master"],
                errorMessage: 'Unrecognized difficulty. Please try again.'
            },
            rank: {
                // The song level (ex. Lv. 14)
                type: 'number',
                errorMessage: 'Invalid song level entered. Please try again'
            },
            score: {
                // The score achieved after completing a round
                type: 'number',
                errorMessage:'Invalid score entered. Please try again'
            },
            fullCombo: {
                // If a Full Combo (round with no GOOD or lower taps recorded) is achieved
                type:'boolean',
                default:false
            },
            comments: {
                type:'string'
            }
        },
        required: ['songName', 'difficulty', 'rank', 'score'],
        additionalProperties:true,
        errorMessage: {
            required: {
                songName:'Please ensure that you have entered a song name',
                difficulty:'Please ensure that you have selected a difficulty',
                rank:'Please ensure that you entered a rank.',
                score:'Please ensure that you entered a score.'
            }
        }
    }
    const validatePostRound = ajv.compile(schema);
    validatePostRound(req.body);
    res.locals.postRoundErrors = validatePostRound.errors;
    next();
}

// Validator for GET requests. Used for validating form data used to search for rounds
const getRoundValidator = (req, res, next) => {
    let schema = {
        type: 'object',
        properties: {
            songName: {
                type:'string',
                errorMessage: 'Could not enter song name. Please try again.'
            },
            fullCombo: {
                type:'boolean',
                errorMessage: 'Invalid combo. Please try again'
            }
        }
    }
    const validateGetRound = ajv.compile(schema);
    validateGetRound(req.query);
    req.locals.getRoundErrors = validateGetRound.errors;
    next();
}

module.exports = {
    postRoundValidator,
    getRoundValidator
}