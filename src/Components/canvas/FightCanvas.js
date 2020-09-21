import { OpponentHealthBar } from '../../Components/healthbar/enemyHealthbar'
import React, { useRef, useEffect, useContext} from 'react';
import PlayerHealthBar from '../../Components/healthbar/healthbar'
import IdleAnimation from '../characterAnimation/idleAnimation'
import PlayerContext from '../../config/playerContext.js'
import OpponentContext from '../../config/opponentContext.js'
import AttackAnimation from '../characterAnimation/playerAttacking.js'
import { Opponent } from '../opponent/opponent';

const FightCanvas = (props) => {
  
    const canvasRef = useRef(null)
    const { PlayerObj, dispatch }  = useContext(PlayerContext)
    const { OpponentObj, dispatchOpp } = useContext(OpponentContext)
    let animationFrameId;
    
    useEffect(() => {
      //insert animation methods here
      
      if(PlayerObj.is_attacking) {
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
        <OpponentHealthBar OpponentObj={OpponentObj}/>
       </div>

       <div style={{align: "center"}}>
         <canvas ref={canvasRef} style={{ }} id="game-area" data-testid="game-area" /> 
       </div>
      
    </div>)
}


export default FightCanvas;