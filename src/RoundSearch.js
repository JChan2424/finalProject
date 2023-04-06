// Component for the form to search 
import React from 'react';
import axios from 'axios';
const { useEffect, useState } = React;

const RoundSearch = props => {
    let songName;
    let fullCombo;
    const updateSongName = event => {
        songName = "";
        songName = event.target.value;
        console.log(songName);
    }
    const updateFullCombo = event => {
        fullCombo = "";
        fullCombo = event.target.value;
    }
    const makeRoundGetRequest = (event) => {
        event.preventDefault(); // Not Preventing default?
        console.log("Request made")
        axios.get(`../api/v1/rounds/?songName=${songName}&fullCombo=${fullCombo}`)
        .then(results => {
            console.log("Results ", results)
            props.setResults(results);
            props.setRequestType("GET Round");
        })
        .catch(error => {
            console.log(error);
        })
    }
    //  onSubmit={makeGetRequest(event)}
    // Infinite loop
    return (
        <>
            <div id="round-search">
                <h2>Search for a round</h2>
                <form onSubmit={event=>makeRoundGetRequest(event)}>
                   <label htmlFor="songName">Song Name: </label>
                   <input type="text" name="songName" id="songName" placeholder="Song Name" onChange={event=>updateSongName(event)}/>
                   <br />
                   <legend>Full combo: </legend>
                   <label htmlFor="full-combo">Yes: </label>
                   <input type="radio" id="full-combo" name="fullCombo" value="true" onChange={event=>updateFullCombo(event)}/>
                   <label htmlFor="not-full">No: </label>
                   <input type="radio" id="not-full" name="fullCombo" value="false" onChange={event=>updateFullCombo(event)} />
                    <br />
                   <input type="submit" value="Search" />  <input type="reset" />
                </form>
            </div>
        </>
    );
};

export default RoundSearch;