import { OpponentHealthBar } from '../../Components/healthbar/enemyHealthbar'
import React, { createRef, useRef, useEffect, useContext} from 'react';
import PlayerHealthBar from '../../Components/healthbar/healthbar'
import IdleAnimation from '../characterAnimation/idleAnimation'
import PlayerContext from '../../config/playerContext.js'
import OpponentContext from '../../config/opponentContext.js'
import AttackAnimation from '../characterAnimation/playerAttacking.js'
import { Opponent } from '../opponent/opponent';
import OpponentAttackAnimation from '../characterAnimation/opponentAttacking';

const FightCanvas = (props) => {
  
    let canvasRef = createRef(null)
    const { PlayerObj, dispatch }  = useContext(PlayerContext)
    const { OpponentObj, dispatchOpp } = useContext(OpponentContext)
    let animationFrameId;
    
    useEffect(() => {
      //insert animation methods here
      console.log("USE EFFECT TRIGGERED")
      if(PlayerObj.is_attacking && !OpponentObj.is_attacking) {
        AttackAnimation(PlayerObj); 
        //PlayerObj.toggleAttack();
        setTimeout(() => { 
          dispatchOpp({type: 'set_attack', payload: true});
          dispatch({type: 'attacked', payload: 15});
          dispatch({type: 'set_attack', payload: false});
        }, 1000 )
      } else if (OpponentObj.is_attacking && !PlayerObj.is_attacking) {
        OpponentAttackAnimation(OpponentObj);
        //OpponentObj.toggleAttack();
        setTimeout(() => { 
          dispatchOpp({type: 'set_attack', payload: false})
        }, 3000 )
      } else if (!OpponentObj.is_attacking && !PlayerObj.is_attacking) {
        IdleAnimation(PlayerObj); 
      } else {
        console.log("wtf? Player: " + PlayerObj.is_attacking + "| Opponent: " + OpponentObj.is_attacking)
        console.log(PlayerObj, OpponentObj)
      }
      return () => {
        //window.cancelAnimationFrame(animationFrameId)
      } 
    },[PlayerObj, animationFrameId, OpponentObj])
    
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