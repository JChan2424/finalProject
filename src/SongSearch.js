// Component to render the form for Searching for songs in the database. 
import React from 'react';
import axios from 'axios';
const { useEffect, useState } = React;

const SongSearch = props => {
    
    const updateName = event => {
        props.setSongName(event.target.value);
    }
    const updateCombo = event => {
        props.setFullCombo(event.target.value);
        console.log(props.fullCombo)
    }
    const makeGetRequest = (event) => {
        event.preventDefault();
        console.log("Get request", props.fullCombo)
        axios.get(`../api/v1/songs/?name=${props.songName}&combo=${props.fullCombo}`)
        .then(results => {
            props.setResults(results);
            props.setRequestType("GET Song");
        })
        .catch(error => {
            console.log()
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
                </form>
            </div>
        </>
    );
}

export default SongSearch;