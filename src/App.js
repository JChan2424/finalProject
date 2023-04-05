import React from 'react';
const { useEffect, useState } = React;

import Round from './Round.js';
import RoundSearch from './RoundSearch.js';
import Song from './Song.js';
import SongSearch from './SongSearch';
const App = props => {
    const [results, setResults] = useState();
    return (
        <>
            <h1>Welcome to the Unofficial Project Sekai Score Tracker!</h1>
            <div id="wrapper">
                <div id="round-container">
                    <Round />
                    <RoundSearch setResults={setResults}/>
                </div>
                <div id="song-container">
                    <Song />
                    <SongSearch />
                </div>
            </div>
        </>
    );    
}

export default App;
