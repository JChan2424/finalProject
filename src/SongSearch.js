// Component to render the form for Searching for songs in the database. 
import React from 'react';
import axios from 'axios';
const { useEffect, useState } = React;

const SongSearch = props => {
    // action="../api/v1/songs" method="GET"
    let name;
    let combo;
    const updateName = event => {
        name = "";
        name = event.target.value;
        console.log("SongSearch name: ", name)
    }
    const updateCombo = event => {
        combo ="";
        combo = event.target.value;
    }
    const makeGetRequest = (event) => {
        event.preventDefault();
        axios.get(`../api/v1/songs/?name=${name}&combo=${combo}`)
        .then(results => {
            props.setResults(results);
            props.setRequestType("GET Song");
        })
        .catch(error => {
            props.setResults(error);
        })
    }
    return (
        <>
            <div id="song-search">
                <h2>Search for a song</h2>
                <form onSubmit={event=>makeGetRequest(event)}>
                   <label htmlFor="name">Song Name: </label>
                   <input type="text" name="name" id="name" placeholder="Song Name" onChange={event => updateName(event)}/>
                   <br />
                   <legend>Full combo: </legend>
                   <label htmlFor="full-combo">Yes: </label>
                   <input type="radio" id="full-combo" name="combo" value="true" onChange={event => updateCombo(event)} />
                   <label htmlFor="not-full">No: </label>
                   <input type="radio" id="not-full" name="combo" value="false" onChange={event => updateCombo(event)} />
                    <br />
                    <input type="submit" value="Search" action="../api/v1/songs" method="GET" /> <input type="reset" />
                   {/*<button onClick={makeGetRequest}>Search</button>  */}
                </form>
            </div>
        </>
    );
}

export default SongSearch;