// Component for the form to create a Round
import React from 'react';
import axios from 'axios';
const { useEffect, useState } = React;

const Round = props => {
    
    return (
        <>
            <div id="round">
                <h2>Save a round</h2>
                <form action="../api/v1/rounds" method="POST">
                   <label for="songName">Song Name: </label>
                   <input type="text" name="songName" id="songName" placeholder="Song Name" />
                   <br />
                   <legend>Rank: </legend>
                   <label for="easy">Easy: </label>
                   <input type="radio" id="easy" name="difficulty" value="easy"/>
                   <label for="normal">Normal: </label>
                   <input type="radio" id="normal" name="difficulty" value="normal"/>
                   <label for="hard">Hard: </label>
                   <input type="radio" id="hard" name="difficulty" value="hard"/>
                   <label for="expert">Expert: </label>
                   <input type="radio" id="expert" name="difficulty" value="expert"/>
                   <label for="master">Master: </label>
                   <input type="radio" id="master" name="difficulty" value="master"/>
                   <br />
                   <label for="difficulty">Difficulty: </label>
                   <input type="number" name="rank"min="5" max="45"/>
                   <br />
                   <label for="score">Score: </label>
                   <input type="number" name="score"min="0" />
                   <legend>Full combo: </legend>
                   <label for="full-combo">Yes: </label>
                   <input type="radio" id="full-combo" name="fullCombo" value="true" />
                   <label for="not-full">No: </label>
                   <input type="radio" id="not-full" name="fullCombo" value="false" />
                   <br />
                   <input type="submit" value="Search" />  <input type="reset" />
                </form>
            </div>
        </>
    );
}

export default Round;