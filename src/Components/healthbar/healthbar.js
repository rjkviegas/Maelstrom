import React, { useContext } from 'react';
import './healthbar.css'


export default function PlayerHealthBar({PlayerObj}) {
  let barWidth = (PlayerObj.hp <= 0) ? "0%" : ((PlayerObj.hp)/PlayerObj.MAX_HP)*100 + '%'
  return (
    <div className="health-bar">
      <div className="health-bar-glass">
          <div className="health-bar-fluid anim-width" style={{width: barWidth}}></div>
      </div>
    </div>
  )
}

