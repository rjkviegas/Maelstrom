import React, { useContext } from 'react';
import OpponentContext from '../../config/opponentContext';
import './healthbar.css'

export function OpponentHealthBar({OpponentObj}) {
  let barWidth = (OpponentObj.hp <= 0) ? "0%" : ((OpponentObj.hp)/OpponentObj.MAX_HP)*100 + '%'
  return (
    <div className="health-bar" data-testid="health-bar">
      <div className="health-bar-glass">
          <div className="health-bar-fluid anim-width" data-testid="health-bar-fluid" style={{width: barWidth}}></div>
      </div>
    </div>
  )
}