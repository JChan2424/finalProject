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
    return (
        <>
            <h1>Welcome to the Unofficial Project Sekai Score Tracker!</h1>
            <div id="wrapper">
                <div id="round-container">
                    <Round setResults={setResults} setRequestType={setRequestType}/>
                    <RoundSearch setResults={setResults} setRequestType={setRequestType} />
                </div>
                <div id="song-container">
                    <Song setResults={setResults} setRequestType={setRequestType}/>
                    <SongSearch setResults={setResults} setRequestType={setRequestType} />
                </div>
                <div id="output">
                    <Results setResults={setResults} results={results} requestType={requestType} />
                </div>
            </div>
        </>
    );    
}

export default App;
