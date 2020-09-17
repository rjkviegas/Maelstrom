import React from 'react';
import './healthbar.css'
let enemyHpPlaceholder = "80%"

const enemyHealthbar = (

  <div className="enemy-health-bar">
      <div className="health-bar-glass">
          <div className="health-bar-fluid anim-width" style={{width: enemyHpPlaceholder}}></div>
      </div>
  </div>
)
export default enemyHealthbar