// Component for the form to create a Round
import React from 'react';
import axios from 'axios';
const { useEffect, useState } = React;

const Round = props => {
    
    const updateSongName = event => {
        props.setSongName(event.target.value);
    };
    
    const updateDifficulty = event => {
        props.setDifficulty(event.target.value);
     };
    
    const updateLevel = event => {
         props.setLevel(event.target.value);
    };
    
    const updateScore = event => {
         props.setScore(event.target.value);
    };
    
    const updateCombo = event => {
        props.setFullCombo(event.target.value);
    };
    
    const updateComments = event => {
          props.setComments(event.target.value);
    };
    
    const reset = event => {
        props.setComments(undefined);
        props.setDifficulty(undefined);
        props.setFullCombo(undefined);
        props.setLevel(undefined);
        props.setScore(undefined);
        props.setSongName(undefined);
    }
    
    const makePostRequest = (event) => {
        event.preventDefault();
        let round = {
            songName:props.songName,
            difficulty:props.difficulty,
            level:props.level,
            score:props.score,
            fullCombo:props.fullCombo,
            comments:props.comments
        }
        console.log(round)
        axios.post(`../api/v1/rounds/`, round)
        .then(results => {
            props.setResults(results);
            props.setRequestType("POST Round");
        })
        .catch(error => {
            props.setResults(error)
        })
    }
    return (
        <>
            <div id="round">
                <h2>Save a round</h2>
                <form onSubmit={event=>makePostRequest(event)}>
                   <label htmlFor="songName">Song Name: </label>
                   <input type="text" name="songName" id="songName" placeholder="Song Name" required onChange={event=>updateSongName(event)}/>
                   <br />
                   <legend>Difficulty: </legend>
                   <label htmlFor="easy">Easy: </label>
                   <input type="radio" id="easy" name="difficulty" required value="easy" onChange={event=>updateDifficulty(event)}/>
                   <label htmlFor="normal">Normal: </label>
                   <input type="radio" id="normal" name="difficulty" value="normal" onChange={event=>updateDifficulty(event)}/>
                   <label htmlFor="hard">Hard: </label>
                   <input type="radio" id="hard" name="difficulty" value="hard" onChange={event=>updateDifficulty(event)}/>
                   <label htmlFor="expert">Expert: </label>
                   <input type="radio" id="expert" name="difficulty" value="expert" onChange={event=>updateDifficulty(event)}/>
                   <label htmlFor="master">Master: </label>
                   <input type="radio" id="master" name="difficulty" value="master" onChange={event=>updateDifficulty(event)}/>
                   <br />
                   <label htmlFor="level">Song Level: </label>
                   <input type="number" name="level"min="5" max="45" required onChange={event=>updateLevel(event)}/>
                   <br />
                   <label htmlFor="score">Score: </label>
                   <input type="number" name="score"min="0" required onChange={event=>updateScore(event)}/>
                   <legend>Full combo: </legend>
                   <label htmlFor="full-combo">Yes: </label>
                   <input type="radio" id="full-combo" name="fullCombo" value="true" onChange={event=>updateCombo(event)}/>
                   <label htmlFor="not-full">No: </label>
                   <input type="radio" id="not-full" name="fullCombo" value="false" onChange={event=>updateCombo(event)}/>
                   <br />
                   <label htmlFor="comments">Additional comments: </label>
                   <textarea name="comments" id="comments" cols="30" rows="2"onChange={event=>updateComments(event)}></textarea>
                   <br />
                   <input type="submit" value="Submit" />  <input type="reset" onClick={event=>reset(event)}/>
                </form>
            </div>
        </>
    );
}

export default Round;