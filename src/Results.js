// Component for rendering search results
// Use the controlled component to update this component when results are changed

// If props.results  == null, show an info panel about the game
// If results has been updated, show the info

// Have separate files that get imported for each set of HTML tags?

import React from 'react';
const { useEffect, useState } = React;

import RenderResults from './RenderResults.js';
import NullResults from './NullResults.js'
const Results = props => {
    const [show, setShow] = useState();
    let componentToRender;
    
    
    if(props.results.length <= 0 || props.results.data == undefined) {
        componentToRender = <NullResults setShow={setShow} show={show}/>;
    }
    else {
        console.log("results to render: ", props.results.data)
        if(props.results.data.length <=0) {
            componentToRender = <div><h2>Results</h2><p>No documents matching your parameters found. If you're trying to add a round, make sure that the song associated with the round is in the database.</p></div>
        }
        else {
            componentToRender = <RenderResults results={props.results.data} setShow={setShow} show={show} requestType={props.requestType}/>;
        }
        
    }
    return (
        <>
            
            {componentToRender}
        </>
    )
};

export default Results;