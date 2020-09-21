import { OpponentHealthBar } from '../../Components/healthbar/enemyHealthbar'
import React, { useRef, useEffect, useContext} from 'react';
import PlayerHealthBar from '../../Components/healthbar/healthbar'
import IdleAnimation from '../characterAnimation/idleAnimation'
import PlayerContext from '../../config/playerContext.js'
import AttackAnimation from '../characterAnimation/playerAttacking.js'

const FightCanvas = (props) => {
  
    const canvasRef = useRef(null)
    const { PlayerObj }  = useContext(PlayerContext)
    let animationFrameId;
    

    
    useEffect(() => {
      //insert animation methods here
      
      
      if(PlayerObj.is_attacking === true) {
        AttackAnimation(PlayerObj);
        PlayerObj.toggleAttack();
      }else{
        IdleAnimation(PlayerObj); 
      }
      
      

      return () => {
        window.cancelAnimationFrame(animationFrameId)
      } 
    },[PlayerObj, animationFrameId])
    
    return (
    <div>
      <div id="healthbars">
        <PlayerHealthBar PlayerObj={PlayerObj}/>
        <OpponentHealthBar/>
       </div>

       <div style={{align: "center"}}>
         <canvas ref={canvasRef} style={{ }} id="game-area" data-testid="game-area" /> 
       </div>
      
    </div>)
}


export default FightCanvas;