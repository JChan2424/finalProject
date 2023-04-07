import React from 'react';

const { useEffect, useState } = React

const SuccessfulSongPost = props => {
    
    return(
        <>
            <div>
                <h3>Song Saved Successfully!</h3>
                <h4>Song Summary: </h4>
                <p>Song name: {props.results.name}</p>
                <p>Group: {props.results.group}</p>
            </div>
        </>
    );
};

export default SuccessfulSongPost;