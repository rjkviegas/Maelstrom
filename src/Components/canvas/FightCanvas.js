import { OpponentHealthBar } from '../../Components/healthbar/enemyHealthbar'
import React, { createRef, useRef, useEffect, useContext} from 'react';
import PlayerHealthBar from '../../Components/healthbar/healthbar'
import IdleAnimation from '../characterAnimation/idleAnimation'
import PlayerContext from '../../config/playerContext.js'
import OpponentContext from '../../config/opponentContext.js'
import AttackAnimation from '../characterAnimation/playerAttacking.js'
import { Opponent } from '../opponent/opponent';
import OpponentAttackAnimation from '../characterAnimation/opponentAttacking';

let canvas, ctx
let cancelAnimationFrame = window.requestAnimationFrame || 
                        window.mozRequestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.msRequestAnimationFrame;

const FightCanvas = (props) => {
  
    let canvasRef = createRef(null)
    const { PlayerObj, dispatch }  = useContext(PlayerContext)
    const { OpponentObj, dispatchOpp } = useContext(OpponentContext)
    let animationFrameId;
    
    useEffect(() => {

      canvas = canvasRef.current
      ctx = canvas.getContext('2d')

      //insert animation methods here
      console.log("USE EFFECT TRIGGERED")
      if(PlayerObj.is_attacking && !OpponentObj.is_attacking) {
        if (OpponentObj.is_attacking || !PlayerObj.is_attacking) { return }
        console.log("Play attack triggered")
        AttackAnimation(PlayerObj, canvas, ctx); 
        PlayerObj.toggleAttack();
        console.log(PlayerObj.is_attacking)
        setTimeout(() => { 
          dispatchOpp({type: 'set_attack', payload: true});
          dispatch({type: 'attacked', payload: 15});
          dispatch({type: 'set_attack', payload: false});
        }, 1000 )
      } else if (OpponentObj.is_attacking && !PlayerObj.is_attacking) {
        if (!OpponentObj.is_attacking || PlayerObj.is_attacking) { return }
        console.log("Opponent attack triggered")
        setTimeout(() => { 
          OpponentAttackAnimation(OpponentObj, canvas, ctx);
          dispatchOpp({type: 'set_attack', payload: false})
        }, 1000 );
      } else if (!OpponentObj.is_attacking && !PlayerObj.is_attacking) {
        if (OpponentObj.is_attacking || PlayerObj.is_attacking) { return }
        console.log("IDLE TIME")
        IdleAnimation(PlayerObj, canvas, ctx); 
      } else {
        IdleAnimation(PlayerObj, canvas, ctx); 
        console.log("wtf? Player: " + PlayerObj.is_attacking + "| Opponent: " + OpponentObj.is_attacking)
      }
      return () => {
        window.cancelAnimationFrame(animationFrameId)
      } 
    },[PlayerObj])
    
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