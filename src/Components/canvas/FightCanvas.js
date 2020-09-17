import React, { useRef, useEffect, useCallback } from 'react';
import healthbar from '../../Components/healthbar/healthbar'
import enemyHealthbar from '../../Components/healthbar/enemyHealthbar'
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
       { healthbar } 
       { enemyHealthbar }

       <div style={{align: "center"}}>
         <canvas ref={canvasRef} style={{ }} id="game-area"{...props}/> 
       </div>
      
    </div>)
}


export default FightCanvas
