import React from 'react';

const { useEffect, useState } = React

const SuccessfulSongGet = props => {
    console.log(props.results.name)
    return(
        <>
            <div>
                <h3>Song Retrieved Successfully!</h3>
                <h4>Song Summary: </h4>
                {props.results.map(song => (<div className="song-output"><p>Song name: {song.name}</p><p>Group: {song.group}</p></div>))}
            </div>
        </>
    );
};

export default SuccessfulSongGet;