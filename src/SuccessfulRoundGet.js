import React from 'react';

const { useEffect, useState } = React

const SuccessfulRoundGet = props => {
    console.log("name", props.results);
    let fullCombo;
    
    return(
        <>
            <div>
                <h3>Round(s) Retrieved Successfully!</h3>
                <h4>Round Summary: </h4>
                {props.results.map((round) => (<div className="round-output" key={round._id}><p>Song name: {round.songName}</p><p>Difficulty: {round.difficulty}</p><p>Level: {round.level}</p><p>Score: {round.score}</p><p>Full Combo?: {round.fullCombo == true ? "Yes" : "No"}</p><p>Comments: {round.comments}</p></div>))}
            </div>
        </>
    );
};

export default SuccessfulRoundGet;