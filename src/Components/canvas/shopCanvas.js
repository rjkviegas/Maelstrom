import React, { useContext } from 'react';
import opponent,{ Opponent } from '../classes/bandit/bandit.js'
import { useHistory } from "react-router-dom";
import PlayerContext from '../../config/playerContext.js';
import Gold from '../gold/gold.js'

const ShopCanvas = () => {
    const { PlayerObj }  = useContext(PlayerContext);
    
    let history = useHistory()
    function handleClick() {
        history.push('/play');
    }
    
    return (
        <div>
            <Gold PlayerObj={PlayerObj}/>
            <canvas id="shop" data-testid="shop" />
            <button onClick={handleClick}>Go back</button>
        </div>
    )
}

export default ShopCanvas;
