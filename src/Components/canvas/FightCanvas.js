import { OpponentHealthBar } from '../../Components/healthbar/enemyHealthbar'
import React, { useRef, useEffect, useContext} from 'react';
import PlayerHealthBar from '../../Components/healthbar/healthbar'
import IdleAnimation from '../characterAnimation/idleAnimation'
import PlayerContext from '../../config/playerContext.js'
import PlayerAttackAnimation from '../characterAnimation/playerAttacking.js'
import OpponentContext from '../../config/opponentContext';
import drawAnimation from './FightCanvas2/FightCanvas2.js'
const FightCanvas = (props) => {
  
    const canvasRef = useRef(null)
    const { PlayerObj }  = useContext(PlayerContext)
    const { OpponentObj } = useContext(OpponentContext)
    let animationFrameId;
    

    
    useEffect(() => {
      //insert animation methods here
      
      
      if(PlayerObj.is_attacking === true) {
        PlayerAttackAnimation(PlayerObj);
        PlayerObj.toggleAttack(); // TODO:redundant line?
      }else{
        IdleAnimation(PlayerObj); 
      }
      
      

      return () => {
        window.cancelAnimationFrame(animationFrameId)
      } 
    })
    
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