import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import PlayerContext from '../../config/playerContext.js';
import Gold from '../gold/gold.js'

const ShopCanvas = () => {
    const { PlayerObj, dispatch }  = useContext(PlayerContext)
    
    let history = useHistory()
    function handleClick() {
        history.push('/play');
    }

    const addStrength = () => {
        dispatch({type: 'ADD_STRENGTH', payload: 5});
    }
    
    const addDefence = () => {
        dispatch({type: 'ADD_DEFENCE', payload: 5})
    }
    
    return (
        <div data-testid="shop">

            <Gold PlayerObj={PlayerObj}/>

                <div className="item1">
                    <button data-testid="sword-button" id="item" onClick={addStrength}>Sword</button>
                </div>
                <p className="hide1">The Sword of 1000 truths, once said to belong to King Arthur... But that myth is lost to the Maelstrom. Grants extra damage.</p>

                <div className="item1">
                    <button data-testid="shield-button" id="item" onClick={addDefence}>Shield</button>
                </div>
                <p className="hide1">A shield, once wielded by a great Ragnar Lothbrok who fought in the shield wall attacking East Anglia. Grants extra defence.</p>
        
            <button data-testid="back-button" onClick={handleClick}>Go back</button>
        </div>
    )
}

export default ShopCanvas;
