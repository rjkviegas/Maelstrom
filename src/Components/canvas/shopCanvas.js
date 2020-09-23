import React, { useContext } from 'react';
import PlayerContext from '../../config/playerContext.js';
import Gold from '../gold/gold.js'

const ShopCanvas = () => {
    const { PlayerObj }  = useContext(PlayerContext);
    return (
        <div data-testid="shop">

            <Gold PlayerObj={PlayerObj}/>

                <div class="item1">
                    <button id="item" onClick={"minusGold(); addAttack()"}>Sword</button>
                </div>
                <p class="hide1">The Sword of 1000 truths, once said to belong to King Arthur... But that myth is lost to the Maelstrom. Grants extra damage.</p>

                <div class="item1">
                    <button id="item" onClick={"minusGold(); addDefence()"} >Shield</button>
                </div>
                <p class="hide1">A shield, once wielded by a great Ragnar Lothbrok who fought in the shield wall attacking East Anglia. Grants extra defence.</p>
                
        </div>
    )
}

export default ShopCanvas;
