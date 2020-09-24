import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import PlayerContext from '../../config/playerContext.js';
import Gold from '../gold/gold.js'

const ShopCanvas = () => {
    const SWORD_STRENGTH = 5;
    const SHIELD_DEFENCE = 5;
    const MIN_MONIES = 200;

    const { PlayerObj, dispatch }  = useContext(PlayerContext)
    
    let history = useHistory()
    function handleClick() {
        history.push('/play');
    }

    const buySword = () => {
        if (PlayerObj.money < MIN_MONIES) return;
        dispatch({type: 'ADD_STRENGTH', payload: SWORD_STRENGTH});
        dispatch({type: 'DEDUCT_MONIES', payload: MIN_MONIES});
    }
    
    const buyShield = () => {
        if (PlayerObj.money < MIN_MONIES) return;
        dispatch({type: 'ADD_DEFENCE', payload: SHIELD_DEFENCE});
        dispatch({type: 'DEDUCT_MONIES', payload: MIN_MONIES});
    }
    
    return (
        <div data-testid="shop" style={{height: '400px'}}>

            <Gold PlayerObj={PlayerObj}/>
                <div style={{paddingTop: "20px", height: '350px', paddingBottom: '10px'}}>
                    <div className="item1">
                        <button data-testid="sword-button" id="item" onClick={buySword}>Sword</button>
                    </div>
                    <p className="hide1">The Sword of 1000 truths, once said to belong to King Arthur... But that myth is lost to the Maelstrom. Grants extra damage.</p>

                    <div className="item1">
                        <button data-testid="shield-button" id="item" onClick={buyShield}>Shield</button>
                    </div>
                    <p className="hide1">A shield, once wielded by a great Ragnar Lothbrok who fought in the shield wall attacking East Anglia. Grants extra defence.</p>
            
                  
                </div>
                <button data-testid="back-button" onClick={handleClick}>Go back</button>
        </div>
    )
}

export default ShopCanvas;
