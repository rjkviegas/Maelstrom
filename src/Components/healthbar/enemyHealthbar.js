import React, { useContext } from 'react';
import OpponentContext from '../../config/opponentContext';
import './healthbar.css'
let enemyHpPlaceholder = "80%"

const enemyHealthbar = (

  <div className="enemy-health-bar">
      <div className="health-bar-glass">
          <div className="health-bar-fluid anim-width" style={{width: enemyHpPlaceholder}}></div>
      </div>
  </div>
)

export function OpponentHealthBar() {
  const { OpponentObj }  = useContext(OpponentContext)
  let barWidth = (OpponentObj.hp <= 0) ? "0%" : ((OpponentObj.hp)/OpponentObj.MAX_HP)*100 + '%'
  return (
    <div className="health-bar" data-testid="health-bar">
      <div className="health-bar-glass">
        <div className="health-bar-fluid anim-width" data-testid="opponent-health-bar" style={{width: barWidth, fontSize: '10px'}}>{OpponentObj.hp < 0 ? 0 : OpponentObj.hp}</div>
      </div>
    </div>
  )
}

export default enemyHealthbar