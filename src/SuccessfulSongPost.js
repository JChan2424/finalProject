import React from 'react';

const { useEffect, useState } = React

const SuccessfulSongPost = props => {
    return(
        <>
            <div>
                <h3>Song Creation Summary:</h3>
                {/*If there is an error, render an appropriate header. Otherwise, render the approprioate header for a successful post*/}
                {props.results.length > 0 ? <h4>Error(s) occured: </h4> : <h4>Song Saved Successfully!</h4>}
                {props.results.length > 0 ? props.results.map((error)=>(<div><p>{error.message}</p></div>)) : <div><p>Song name: {props.results.name}</p><p>Group: {props.results.group}</p></div>}
                {/*If props.results has no property message, then it can't be an array of errors*/}
                {/*If it does have a property message, then it is an array errors*/}
                {/*If it is an array of errors, render each error. Otherwise render the summary of the post*/}
            </div>
        </>
    );
};

export default SuccessfulSongPost;