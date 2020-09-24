import React from 'react';
import './healthbar.css'

function PlayerHealthBar({PlayerObj}) {
  let barWidth = (PlayerObj.hp <= 0) ? "0%" : ((PlayerObj.hp)/PlayerObj.MAX_HP)*100 + '%'
  return (
    <div className="health-bar"><div id="player_name">{PlayerObj.name}</div>
      <div className="health-bar-glass">
        <div className="health-bar-fluid anim-width" data-testid="player-health-bar" style={{width: barWidth,  fontSize: '10px', textAlign: 'center'}}>{PlayerObj.hp < 0 ? 0 : PlayerObj.hp}</div>
      </div>
    </div>
  )
}

export default PlayerHealthBar;

