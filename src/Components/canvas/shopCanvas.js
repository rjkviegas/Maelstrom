import React, { useContext } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import PlayerContext from '../../config/playerContext.js';
import Gold from '../gold/gold.js'

const ShopCanvas = () => {
    const { PlayerObj }  = useContext(PlayerContext);
    return (
        <div>
            <Gold PlayerObj={PlayerObj}/>
            <canvas id="shop" data-testid="shop" />
            <button><Router><Route><Link to='/play'>Go back</Link></Route></Router></button>
        </div>
    )
}

export default ShopCanvas;
