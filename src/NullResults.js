import React from 'react';

const NullResults = props => {
    const updateShow = event => {
        event.preventDefault();
        console.log("checked: ",event.target.checked);
        
    }
    // console.log(props.show)
    const parseToBoolean = (stringToParse) => {
        // console.log(stringToParse)
        return (stringToParse.toLowerCase() + '' === 'true') 
    }
    // props.setShow(parseToBoolean(props.show));
    // if(props.show) {
    //     document.getElementById("results-container").style.visibility = "visible";
    // }
    // else {
    //     document.getElementById("results-container").style.visibility = "hidden";
    // }
    /*
        <form>
                <label htmlFor="show">Show Game Facts</label>
                <input type="checkbox" id="show" name="show" value="show" onChange={event=>updateShow(event)} />
            </form>
    
    */
    return(
        <>
            <h2>About the game</h2>
            
            <div id="results-container">
                <p>Project Sekai is a rhythmn game.</p>
            </div>
        </>
    )
}

export default NullResults;