// Component for rendering search results
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