// Component for the form to search 
import React from 'react';
import axios from 'axios';
const { useEffect, useState } = React;

const RoundSearch = props => {
    
    return (
        <>
            <div id="round-search">
                <h2>Search for a round</h2>
                <form action="rounds/" method="GET">
                   <label for="songName">Song Name: </label>
                   <input type="text" name="songName" id="songName" placeholder="Song Name" />
                   <br />
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

export default RoundSearch;