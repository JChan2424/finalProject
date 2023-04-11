// Component for the form to search
import React from 'react';
import axios from 'axios';
const { useEffect, useState } = React;

const RoundSearch = props => {
    
    const updateSongName = event => {
    
        props.setSongName(event.target.value);
        console.log(props.songName)
    };
    const updateFullCombo = event => {
        event.stopPropagation();
        props.setFullCombo(event.target.value);
        console.log(props.fullCombo)
    };
    
    const reset = event => {
        props.setSongName(undefined);
        props.setFullCombo(undefined);
    };
    const makeRoundGetRequest = (event) => {
        event.preventDefault();
        console.log(props.songName, props.fullCombo)
        axios.get(`../api/v1/rounds/?songName=${props.songName}&fullCombo=${props.fullCombo}`)
        .then(results => {
            props.setResults(results);
            props.setRequestType("GET Round");
        })
        .catch(error => {
            props.setResults(error);
            console.log(error);
        })
    }
    
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
                   <input type="radio" id="full-combo" name="fullCombo" value="true" onClick={event=>updateFullCombo(event)}/>
                   <label htmlFor="not-full">No: </label>
                   <input type="radio" id="not-full" name="fullCombo" value="false" onClick={event=>updateFullCombo(event)} />
                    <br />
                   <input type="submit" value="Search" />  <input type="reset" onClick={event=>reset(event)} />
                </form>
            </div>
        </>
    );
};

export default RoundSearch;