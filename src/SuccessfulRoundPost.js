import React from 'react';

const { useEffect, useState } = React

const SuccessfulRoundPost = props => {
    console.log("name", props.results);
    let fullCombo;
    
    if(props.results.fullCombo == "true") {
        fullCombo = "Yes";
    } 
    else {
        fullCombo = "No";
    }
    return(
        <>
            <div>
                <h3>Round Saved Successfully!</h3>
                <h4>Round Summary: </h4>
                <p>Song name: {props.results.songName}</p>
                <p>Difficulty: {props.results.difficulty}</p>
                <p>Level: {props.results.level}</p>
                <p>Score: {props.results.score}</p>
                <p>Full Combo?: {fullCombo}</p>
                <p>Comments: {props.results.comments}</p>
            </div>
        </>
    );
};

export default SuccessfulRoundPost;