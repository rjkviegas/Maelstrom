import React from 'react';
let enemyHpPlaceholder = "40%"

const enemyHealthbar = (

  <div className="enemy-health-bar">
      <div className="health-bar-glass">
          <div className="health-bar-fluid anim-width" style={{width: enemyHpPlaceholder}}></div>
      </div>
  </div>
)
export default enemyHealthbar