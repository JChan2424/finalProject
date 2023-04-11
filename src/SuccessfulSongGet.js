import React from 'react';

const { useEffect, useState } = React

const SuccessfulSongGet = props => {
    console.log(props.results.name)
    return(
        <>
            <div>
                <h3>Song Retrieval Summary!</h3>
                {/*If there is an error, render an appropriate header. Otherwise, render the approprioate header for a successful search*/}
                {props.results[0].message ? <h4>Error(s) occured: </h4> : <h4>Round(s) Retrieved Successfully!</h4>}
                {props.results[0].message ? props.results.map((error)=>(<div><p>{error.message}</p></div>)) : props.results.map(song => (<div className="song-output"><p>Song name: {song.name}</p><p>Group: {song.group}</p></div>))}
                {/*If props.results has no property message, then it can't be an array of errors*/}
                {/*If it does have a property message, then it is an array errors*/}
                {/*If it is an array of errors, render each error. Otherwise render the summary of the search*/}
            </div>
        </>
    );
};

export default SuccessfulSongGet;