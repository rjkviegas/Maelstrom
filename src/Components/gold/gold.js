import React from 'react';
import coin from '../../media/coin.gif'

const Gold = ({PlayerObj}) => {
    return (
        <div className="coins" id="money" data-testid="money">
            <img src={coin} id="coin" data-testid="coin" alt=""/>{PlayerObj.money}ɓ
        </div> 
    )
}

export default Gold;