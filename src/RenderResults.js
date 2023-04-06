import React from 'react';
import SuccessfulRoundPost from './SuccessfulRoundPost.js';
import SuccessfulSongPost from './SuccessfulSongPost.js';
import SuccessfulRoundGet from './SuccessfulRoundGet.js'
import SuccessfulSongGet from './SuccessfulSongGet.js';
const { useEffect, useState } = React
// Radio buttons onChange pass up a value to hide the information or search results
const RenderResults = props => {
    const updateShow = event => {
        event.preventDefault();
        console.log(event.target.checked);
    }
    
    console.log("results passed down: ", props.results)
    let heading;
    let summary = document.getElementById("results-container");
    
    
    let error = <div></div>
    if(props.results.errors) {
        error = <p>{props.results.error._message}</p>;
    }
    return(
        <>
            <h2>Results</h2>
            
            <div id="results-container" >
                {props.requestType == "POST Round"? <SuccessfulRoundPost results={props.results}/> : <div></div>}
                {props.requestType == "POST Song"? <SuccessfulSongPost results={props.results}/> : <div></div>}
                {props.requestType == "GET Song"? <SuccessfulSongGet results={props.results}/> : <div></div>}
                {props.requestType == "GET Round"? <SuccessfulRoundGet results={props.results}/> : <div></div>}
                
            </div>
            {error}
            
            
        </>
    )
}

export default RenderResults;