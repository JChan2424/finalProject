import React from 'react';

const NullResults = props => {
    const updateShow = event => {
        event.preventDefault();
        console.log("checked: ",event.target.checked);
        
    }
    
    const parseToBoolean = (stringToParse) => {
        
        return (stringToParse.toLowerCase() + '' === 'true') 
    }
    return(
        <>
            <h2>About the game</h2>
            
            <div id="results-container">
                <p>Hatsune Miku Project Sekai: Colorful Stage is a rhythmn game developed by SEGA, Craft Egg, Colorful Palette and Crypton Future media. It takes place in a fictional Tokyo, Japan and features new original characters and familiar Vocaloid characters. </p>
                <a href='https://www.colorfulstage.com/'>Check out more info here!</a>
               
            </div>
        </>
    )
}

export default NullResults;