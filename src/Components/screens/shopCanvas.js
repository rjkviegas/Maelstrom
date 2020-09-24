import React, { useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import PlayerContext from '../../config/playerContext.js';
import Gold from '../gold/gold.js'
import PlayerHealthBar from '../healthbar/playerHealthbar.js'
import './shopCanvas.css'

const ShopCanvas = () => {
    const SWORD_STRENGTH = 5;
    const SWORD_COST = 200;
    const SHIELD_DEFENCE = 5;
    const SHIELD_COST = 200;
    const HEALTH_POTION_HP_BOOST = 10;
    const HEALTH_POTION_COST = 10;
    const purchased_text = "Out of stock";
    
    const { PlayerObj, dispatch }  = useContext(PlayerContext);
    const [invalid, invalidate] = useState(null);
    let history = useHistory();

    function handleClick(e) {
        history.push('/play');
    }

    const items = {
        sword: {strength: SWORD_STRENGTH, defence: 0, cost: SWORD_COST, hp_boost: 0},
        shield: {strength: 0, defence: SHIELD_DEFENCE, cost: SHIELD_COST, hp_boost: 0},
        health_potion: {strength: 0, defence: 0, cost: HEALTH_POTION_COST, hp_boost: HEALTH_POTION_HP_BOOST} 
    }

    const buySword = () => {
        if (PlayerObj.money < items.sword.cost)  { invalidate("Insufficient funds"); return; }

        dispatch({type: 'ADDED_STRENGTH', payload: items.sword.strength});
        dispatch({type: 'DEDUCTED_MONEY', payload: items.sword.cost});
        dispatch({type: 'ADDED_SWORD_TO_INVENTORY', payload: true})
    }
    
    const buyShield = () => {
        if (PlayerObj.money < items.shield.cost)  { invalidate("Insufficient funds"); return; }
      
        dispatch({type: 'ADDED_DEFENCE', payload: items.shield.defence});
        dispatch({type: 'DEDUCTED_MONEY', payload: items.shield.cost});
        dispatch({type: 'ADDED_SHIELD_TO_INVENTORY', payload: true})  
    }
    
    const buyHealthPot = () => {

        if (PlayerObj.money < HEALTH_POTION_COST ) { invalidate("Insufficient funds"); return; }
        if (PlayerObj.hp >= PlayerObj.MAX_HP) { invalidate("You are already full HP!"); return;} 
        let proposed_new_HP = PlayerObj.hp + HEALTH_POTION_HP_BOOST
        let boost_to_player = ((proposed_new_HP) > PlayerObj.MAX_HP) ? (PlayerObj.MAX_HP - PlayerObj.hp) : HEALTH_POTION_HP_BOOST
        dispatch({type: 'TAKEN_HEALTH_POTION', payload: boost_to_player })
        dispatch({type: 'DEDUCTED_MONEY', payload: items.health_potion.cost});
    }
    
    let visibleSword = (<div><div className="item1"><button data-testid="sword-button" id="item" onClick={buySword}>Sword {items.sword.cost}ɓ</button></div>
        <p className="hide1">The Sword of 1000 truths, once said to belong to King Arthur... But that myth is lost to the Maelstrom. Grants extra {items.sword.strength} damage stats. Costs {items.sword.cost} blasei shards.</p></div>)

    let visibleShield = (<div><div className="item1"><button data-testid="shield-button" id="item" onClick={buyShield}>Shield {items.shield.cost}ɓ</button></div>
        <p className="hide1">A shield, once wielded by a great Ragnar Lothbrok who fought in the shield wall attacking East Anglia. Grants extra {items.shield.defence} defence stats. Costs {items.shield.cost} blasei shards.</p></div>)

    let healthPot = (<div><div className="item1"><button data-testid="healthpot-button" id="item" onClick={buyHealthPot}>Health Potion {items.health_potion.cost}ɓ</button></div>
        <p className="hide1">A natural concoction of sorts, brewed and distilled by the Su'lgaryan Druids who inhabit the dense forestland. Grants {items.health_potion.hp_boost} HP. Costs {items.health_potion.cost} blasei shards.</p></div>)
    
    return (
        <div data-testid="shop" style={{height: '400px'}}>
            <div data-testid="welcoming" >
                <p id="welcome">Welcome to the store</p>
                <p style={{fontSize: "10px"}}>What can we get you, maybe a potion to drink?</p>
                <p style={{fontSize: "10px"}}>Our inhouse maid Ryan will bring it over</p>
            </div>     
            <div>
                <div><button data-testid="back-button" id="back-button" onClick={(e) => handleClick(e)}>Go back</button></div>
                    <PlayerHealthBar PlayerObj={PlayerObj} />
                    <Gold PlayerObj={PlayerObj}/>
                <div id="shop_display">        
                    {!PlayerObj.hasSword ? visibleSword : <div style={{fontSize: "15px", padding: "10px"}}>{purchased_text}</div> }
                    {!PlayerObj.hasShield ? visibleShield :  <div style={{fontSize: "15px", padding: "10px"}}>{purchased_text}</div>  }
                    <div>{healthPot}</div>                
                </div> 
                {invalid === null ? '': <p style={{fontSize: "15px"}} >{invalid}</p>}
            </div>
       </div>
    )
}

export default ShopCanvas;
