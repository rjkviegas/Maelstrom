import React from 'react';
let playerHpPlaceholder = "60%"

const healthbar = (

  <div className="health-bar">
      <div className="health-bar-glass">
          <div className="health-bar-fluid anim-width" style={{width: playerHpPlaceholder}}></div>
      </div>
  </div>
)
export default healthbar