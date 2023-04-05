// Component to render the form for Searching for songs in the database. 
import React from 'react';
import axios from 'axios';
const { useEffect, useState } = React;

const SongSearch = props => {
    
    return (
        <>
            <div id="song-search">
                <h2>Search for a song</h2>
                <form action="../api/v1/songs" method="GET">
                   <label for="name">Song Name: </label>
                   <input type="text" name="name" id="name" placeholder="Song Name" />
                   <br />
                   <legend>Full combo: </legend>
                   <label for="full-combo">Yes: </label>
                   <input type="radio" id="full-combo" name="combo" value="true" />
                   <label for="not-full">No: </label>
                   <input type="radio" id="not-full" name="combo" value="false" />
                    <br />
                   <input type="submit" value="Search" />  <input type="reset" />
                </form>
            </div>
        </>
    );
}

export default SongSearch;