import React from 'react';

const { useEffect, useState } = React

const SuccessfulRoundPost = props => {
    console.log("props.fullCombo", props.resultsfullCombo)
    return(
        <>
            <div>
                <h3>Round Saved Successfully!</h3>
                <h4>Round Summary: </h4>
                <p>Song name: {props.results.songName}</p>
                <p>Difficulty: {props.results.difficulty}</p>
                <p>Level: {props.results.level}</p>
                <p>Score: {props.results.score}</p>
                <p>Full Combo?: {props.results.fullCombo ? "Yes" : "No"}</p>
                <p>Comments: {props.results.comments}</p>
            </div>
        </>
    );
};

export default SuccessfulRoundPost;