import React, { useContext } from 'react';
import PlayerContext from '../../config/playerContext.js';
import Gold from '../gold/gold.js'

const ShopCanvas = () => {
    const { PlayerObj }  = useContext(PlayerContext);
    return (
        <>
            <Gold PlayerObj={PlayerObj}/>
            <canvas id="shop" data-testid="shop" />
        </>
    )
}

export default ShopCanvas;
