import React from 'react';
import SuccessfulRoundPost from './SuccessfulRoundPost.js';
import SuccessfulSongPost from './SuccessfulSongPost.js';
import SuccessfulRoundGet from './SuccessfulRoundGet.js'
import SuccessfulSongGet from './SuccessfulSongGet.js';
const { useEffect, useState } = React

const RenderResults = props => {
    const updateShow = event => {
        event.preventDefault();
    }
    
    return(
        <>
            <h2>Results</h2>
            
            <div id="results-container" >
                {props.requestType == "POST Round" && !props.results._message ? <SuccessfulRoundPost results={props.results}/> : <div></div>}
                {props.requestType == "POST Song" && !props.results._message ? <SuccessfulSongPost results={props.results}/> : <div></div>}
                {props.requestType == "GET Song"&& !props.results._message ? <SuccessfulSongGet results={props.results}/> : <div></div>}
                {props.requestType == "GET Round" && !props.results._message ? <SuccessfulRoundGet results={props.results}/> : <div></div>}
                {props.results._message ? <p>{props.results._message}</p> : <div></div>}
            </div>
            
            
            
        </>
    )
}

export default RenderResults;