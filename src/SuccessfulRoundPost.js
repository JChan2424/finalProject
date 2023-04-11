import React from 'react';

const { useEffect, useState } = React

const SuccessfulRoundPost = props => {
    console.log(props.results)
    return(
        <>
            <div>
                <h3>Round Creation Summary:</h3>
                {/*If there is an error, render an appropriate header. Otherwise, render the appropriate header for a successful post*/}
                { props.results.length > 0 ? <h4>Error(s) occured: </h4> : <h4>Round Saved Successfully!</h4>}
                {props.results.length > 0 ? props.results.map((error)=>(<div><p>{error.message}</p></div>)) : <div><p>Song name: {props.results.songName}</p><p>Difficulty: {props.results.difficulty}</p><p>Level: {props.results.level}</p><p>Score: {props.results.score}</p><p>Full Combo?: {props.results.fullCombo ? "Yes" : "No"}</p><p>Comments: {props.results.comments}</p></div>}
                {/*If props.results has no property message, then it can't be an array of errors*/}
                {/*If it does have a property message, then it is an array errors*/}
                {/*If it is an array of errors, render each error. Otherwise render the summary of the post*/}
            </div>
        </>
    );
};

export default SuccessfulRoundPost;