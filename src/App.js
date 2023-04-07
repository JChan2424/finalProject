import React from 'react';
const { useEffect, useState } = React;

import Round from './Round.js';
import RoundSearch from './RoundSearch.js';
import Song from './Song.js';
import SongSearch from './SongSearch';
import Results from './Results.js'
const App = props => {
    const [results, setResults] = useState([]);
    const [requestType, setRequestType] = useState();
    
    
    const [songName, setSongName] = useState(); 
    const [difficulty, setDifficulty] = useState();
    const [score, setScore] = useState();
    const [level, setLevel] = useState(); 
    const [fullCombo, setFullCombo] = useState(); 
    const [comments, setComments] = useState();
    const [group, setGroup] = useState();
    
    return (
        <>
            <h1>Welcome to the Unofficial Project Sekai Score Tracker!</h1>
            <div id="wrapper">
                <div id="round-container">
                    <Round setResults={setResults} songName={songName} setSongName={setSongName} difficulty={difficulty} setDifficulty={setDifficulty} level={level} setLevel={setLevel} fullCombo={fullCombo} setFullCombo={setFullCombo} score={score} setScore={setScore} comments={comments} setComments={setComments} setRequestType={setRequestType}/>
                    
                    <RoundSearch setResults={setResults} songName={songName} setSongName={setSongName} fullCombo={fullCombo} setFullCombo={setFullCombo} setRequestType={setRequestType} />
                </div>
                <div id="song-container">
                    <Song setResults={setResults} songName={songName} setSongName={setSongName} group={group} setGroup={setGroup} setRequestType={setRequestType}/>
                    <SongSearch setResults={setResults} songName={songName} setSongName={setSongName} fullCombo={fullCombo} setFullCombo={setFullCombo} setRequestType={setRequestType} />
                </div>
                <div id="output">
                    <Results setResults={setResults} results={results} requestType={requestType} />
                </div>
            </div>
        </>
    );    
}

export default App;
