import React, { useContext } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import PlayerContext from '../../config/playerContext.js';
import Gold from '../gold/gold.js'

const ShopCanvas = () => {
    const { PlayerObj }  = useContext(PlayerContext);
    return (
        <div data-testid="shop">

            <Gold PlayerObj={PlayerObj}/>

            <button id="item">Sword</button>
            <button id="item">Shield</button>
            <button id="item">Health Potion</button>
 
        </div>
    )
}

export default ShopCanvas;
