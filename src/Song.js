// Component to create a Song
import React from 'react';
import axios from 'axios';
const { useEffect, useState } = React;

const Song = props => {
    
    const updateName = event => {
        props.setSongName(event.target.value);
    };
    
    const updateGroup = event => {
        props.setGroup(event.target.value);
    };
    
    const reset = event => {
        props.setSongName(undefined);
        props.setGroup(undefined);
    };
    const makePostRequest = (event) => {
        event.preventDefault();
        axios.post(`../api/v1/songs/`, {
            name:props.songName,
            group:props.group
        })
        .then(results => {
            props.setResults(results);
            props.setRequestType("POST Song");
            
        })
        .catch(error => {
            console.log(error)
            props.setResults(error);
        })
    }

    return (
        <>
            <div id="song">
                <h2>Save a song</h2>
                <form onSubmit={event=>makePostRequest(event)}>
                    <label htmlFor="songName">Song Name: </label>
                    <input type="text" name="songName" id="songName" required placeholder="Song Name" onChange={event=>updateName(event)}/>
                    <br />
                    <legend>Group: </legend>
                    <label htmlFor="l/n">L/N: </label>
                    <input type="radio" id="l/n" name="group" value="L/N" required onChange={event=>updateGroup(event)} />
                    <label htmlFor="mmj">MMJ: </label>
                    <input type="radio" id="mmj" name="group" value="MMJ" onChange={event=>updateGroup(event)}/>
                    <label htmlFor="vbs">VBS: </label>
                    <input type="radio" id="vbs" name="group" value="VBS" onChange={event=>updateGroup(event)}/>
                    <label htmlFor="wxs">WXS: </label>
                    <input type="radio" id="wxs" name="group" value="WXS" onChange={event=>updateGroup(event)}/>
                    <label htmlFor="n25">N25: </label>
                    <input type="radio" id="n25" name="group" value="N25" onChange={event=>updateGroup(event)}/>
                    <label htmlFor="vs">VS: </label>
                    <input type="radio" id="vs" name="group" value="VS" onChange={event=>updateGroup(event)}/>
                    <label htmlFor="other">Other: </label>
                    <input type="radio" id="other" name="group" value="other" onChange={event=>updateGroup(event)} />
                    <br />
                    <input type="submit" value="Submit" />  <input type="reset" onClick={event=>reset(event)} />
                </form>
            </div>
        </>
    );
}

export default Song;