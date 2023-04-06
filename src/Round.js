// Component for the form to create a Round
import React from 'react';
import axios from 'axios';
const { useEffect, useState } = React;

const Round = props => {
    let songName;
    let difficulty;
    let level;
    let score;
    let fullCombo;
    let comments;
    
    const updateSongName = event => {
        songName = "";
        songName = event.target.value;
        console.log(songName)
    };
    
    const updateDifficulty = event => {
        difficulty = "";
        difficulty = event.target.value;
        console.log(difficulty);
    };
    
    const updateLevel = event => {
        level = "";
        level = event.target.value;
    };
    
    const updateScore = event => {
        score = "";
        score = event.target.value;
    };
    
    const updateCombo = event => {
        fullCombo = "";
        fullCombo = event.target.value;
    };
    
    const updateComments = event => {
        comments = "";
        comments = event.target.value;
    };
    
    const makePostRequest = (event) => {
        event.preventDefault();
        axios.post(`../api/v1/rounds/`, {
            songName:songName,
            difficulty:difficulty,
            level:level,
            score:score,
            fullCombo:fullCombo,
            comments:comments
        })
        .then(results => {
            props.setResults(results);
            props.setRequestType("POST Round");
        })
        .catch(error => {
            console.log(error);
        })
    }
    // onSubmit={makePostRequest(event)}
    
    // Infinite loop of post requests being made
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
                   <input type="radio" id="full-combo" name="fullCombo" value="true" required onChange={event=>updateCombo(event)}/>
                   <label htmlFor="not-full">No: </label>
                   <input type="radio" id="not-full" name="fullCombo" value="false" onChange={event=>updateCombo(event)}/>
                   <br />
                   <label htmlFor="comments">Additional comments: </label>
                   <textarea name="comments" id="comments" cols="30" rows="10"onChange={event=>updateComments(event)}></textarea>
                   <input type="submit" value="Search" />  <input type="reset" />
                </form>
            </div>
        </>
    );
}

export default Round;