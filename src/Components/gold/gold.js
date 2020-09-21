import React, { useContext } from 'react';
import PlayerContext from '../../config/playerContext';
import coin from '../../media/coin.gif'

const Gold = () => {
    const { player } = useContext(PlayerContext);
    return (
        <div className="coins" id="money" data-testid="money">
            <img src={coin} id="coin" data-testid="coin" alt=""/>{player.money}
        </div> 
    )
}

export default Gold;