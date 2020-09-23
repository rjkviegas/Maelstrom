import React from 'react';
import './healthbar.css'

export default function OpponentHealthBar({OpponentObj}) {
  let barWidth = (OpponentObj.hp <= 0) ? "0%" : ((OpponentObj.hp)/OpponentObj.MAX_HP)*100 + '%'
  return (
    <div className="health-bar" data-testid="health-bar">
      <div className="health-bar-glass">
        <div className="health-bar-fluid anim-width" data-testid="opponent-health-bar" style={{width: barWidth, fontSize: '10px'}}>{OpponentObj.hp < 0 ? 0 : OpponentObj.hp}</div>
      </div>
    </div>
  )
}
