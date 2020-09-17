import React, { useContext } from 'react';
import './healthbar.css'
import PlayerContext from '../../config/playerContext.js'


let playerHpPlaceholder = "60%"

const playerHealthBar = (
  <div className="health-bar">
      <div className="health-bar-glass">
          <div className="health-bar-fluid anim-width" style={{width: playerHpPlaceholder}}></div>
      </div>
  </div>
)
// export default playerHealthBar

function PlayerHealthBar() {
  const { PlayerObj, setPlayerObjValue } = useContext(PlayerContext)
  let barWidth = ((PlayerObj.hp)/PlayerObj.MAX_HP)*100 + '%'
  return (
    <div className="health-bar">
      <div className="health-bar-glass">
          <div className="health-bar-fluid anim-width" style={{width: barWidth}}></div>
      </div>
    </div>
  )
}

export default PlayerHealthBar