import React, { useRef, useEffect, useCallback } from 'react';
import healthbar from '../../Components/healthbar/healthbar'
import enemyHealthbar from '../../Components/healthbar/enemyHealthbar'
import Wizard from '../characterAnimation/wizard.js'

const Canvas = (props) => {

    const canvasRef = useRef(null)

    useEffect(() => {
      Wizard(); 
      let animationFrameId
     
      return () => {
        window.cancelAnimationFrame(animationFrameId)
    } 
    })
    
    return (
    <div>
       { healthbar } 
       { enemyHealthbar }

       <div>

         <canvas ref={canvasRef} style={{ height: "90%", width: "80%", position: "relative", padding:"9%", border: "solid 5px #000000"}} id="game-area"{...props}/> 
       </div>
      
    </div>)
}


export default Canvas
