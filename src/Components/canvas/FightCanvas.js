import React, { useRef, useEffect, useCallback } from 'react';
import enemyHealthbar, { OpponentHealthBar } from '../../Components/healthbar/enemyHealthbar'
import PlayerHealthBar from '../../Components/healthbar/healthbar'
import idleAnimation from '../characterAnimation/fightAnimation'

const FightCanvas = (props) => {

    const canvasRef = useRef(null)
   
    let animationFrameId
    
    useEffect(() => {
      //insert animation methods here
      idleAnimation(); 
      

      return () => {
        window.cancelAnimationFrame(animationFrameId)
      } 
    })
    
    return (
    <div>
      <div id="healthbars">
        <PlayerHealthBar/>
        <OpponentHealthBar/>
       </div>

       <div style={{align: "center"}}>
         <canvas ref={canvasRef} style={{ }} data-testid="game-area" id="game-area"{...props}/> 
       </div>
      
    </div>)
}


export default FightCanvas