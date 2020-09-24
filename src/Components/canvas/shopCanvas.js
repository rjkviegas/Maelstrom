import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import PlayerContext from '../../config/playerContext.js';
import Gold from '../gold/gold.js'
import PlayerHealthBar from '../healthbar/healthbar.js'

const ShopCanvas = () => {
    const SWORD_STRENGTH = 5;
    const SHIELD_DEFENCE = 5;
    const HEALTH_POTION = 10;
    const MIN_MONIES = 200;
    const POT_COST = 40;

    const { PlayerObj, dispatch }  = useContext(PlayerContext)
    
    let history = useHistory()
    function handleClick() {
        history.push('/play');
    }

    const buySword = () => {
        if (PlayerObj.money < MIN_MONIES) return;
        
        dispatch({type: 'ADD_STRENGTH', payload: SWORD_STRENGTH});
        dispatch({type: 'DEDUCT_MONIES', payload: MIN_MONIES});
        dispatch({type: 'ADDED_SWORD_TO_INVENTORY', payload: true})
    }
    
    const buyShield = () => {
        if (PlayerObj.money < MIN_MONIES) return;
        
        dispatch({type: 'ADD_DEFENCE', payload: SHIELD_DEFENCE});
        dispatch({type: 'DEDUCT_MONIES', payload: MIN_MONIES});
        dispatch({type: 'ADDED_SHIELD_TO_INVENTORY', payload: true})  
    }

    const buyHealthPot = () => {
        if (PlayerObj.money < POT_COST ) return;
        if (PlayerObj.hp < PlayerObj.MAX_HP) return;

        dispatch({type: 'TAKEN_HEALTH_POTION', payload: HEALTH_POTION })
        dispatch({type: 'DEDUCT_MONIES', payload: POT_COST});
    }   

    let visibleSword = (<div><div className="item1"><button data-testid="sword-button" id="item" onClick={buySword}>Sword 200ɓ</button></div>
        <p className="hide1">The Sword of 1000 truths, once said to belong to King Arthur... But that myth is lost to the Maelstrom. Grants extra damage. Costs 200 blasei shards.</p></div>)

    let visibleShield = (<div><div className="item1"><button data-testid="shield-button" id="item" onClick={buyShield}>Shield 200ɓ</button></div>
        <p className="hide1">A shield, once wielded by a great Ragnar Lothbrok who fought in the shield wall attacking East Anglia. Grants extra defence. Costs 200 blasei shards.</p></div>)

    let healthPot = (<div><div className="item1"><button data-testid="healthpot-button" id="item" onClick={buyHealthPot}>Health Potion 40ɓ</button></div>
        <p className="hide1">A natural concoction of sorts, brewed and distilled by the Su'lgaryan Druids who inhabit the dense forestland. Grants 10 HP. Costs 40 blasei shards.</p></div>)

    return (
        <div data-testid="shop">
            <PlayerHealthBar PlayerObj={PlayerObj} />
            <Gold PlayerObj={PlayerObj}/>
            
                {!PlayerObj.hasSword ? visibleSword : <div></div> }
                {!PlayerObj.hasShield ? visibleShield : <div></div> }
                {healthPot}
              
            <button data-testid="back-button" onClick={handleClick}>Go back</button>
        </div>
    )
}

export default ShopCanvas;
