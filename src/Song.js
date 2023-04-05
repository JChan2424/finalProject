// Component to create a Song

import React from 'react';
import axios from 'axios';
const { useEffect, useState } = React;

const Song = props => {
    
    return (
        <>
            <div id="song">
                <h2>Save a song</h2>
                <form action="../api/v1/songs" method="POST">
                   <label for="songName">Song Name: </label>
                   <input type="text" name="songName" id="songName" placeholder="Song Name" />
                   <br />
                   <legend>Group: </legend>
                   <label for="l/n">L/N: </label>
                   <input type="radio" id="l/n" name="group" value="L/N"/>
                   <label for="mmj">MMJ: </label>
                   <input type="radio" id="mmj" name="group" value="MMJ"/>
                   <label for="vbs">VBS: </label>
                   <input type="radio" id="vbs" name="group" value="VBS"/>
                   <label for="wxs">WXS: </label>
                   <input type="radio" id="wxs" name="group" value="WXS"/>
                   <label for="n25">N25: </label>
                   <input type="radio" id="n25" name="group" value="N25"/>
                   <label for="vs">VS: </label>
                   <input type="radio" id="vs" name="group" value="VS"/>
                   <label for="other">Other: </label>
                   <input type="radio" id="other" name="group" value="other"/>
                   <br />
                   <input type="submit" value="Search" />  <input type="reset" />
                </form>
            </div>
        </>
    );
}

export default Song;