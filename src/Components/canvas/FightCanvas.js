import { OpponentHealthBar } from '../../Components/healthbar/enemyHealthbar'
import React, { createRef, useRef, useEffect, useContext} from 'react';
import PlayerHealthBar from '../../Components/healthbar/healthbar'
import IdleAnimation from '../characterAnimation/idleAnimation'
import PlayerContext from '../../config/playerContext.js'
import OpponentContext from '../../config/opponentContext.js'
import AttackAnimation from '../characterAnimation/playerAttacking.js'
import { Opponent } from '../opponent/opponent';
import OpponentAttackAnimation from '../characterAnimation/opponentAttacking';
import FightRoundsContext from '../../config/fightRoundsContext';

let canvas, ctx
let cancelAnimationFrame = window.requestAnimationFrame || 
                        window.mozRequestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.msRequestAnimationFrame;

const FightCanvas = (props) => {
  
    let canvasRef = createRef(null)
    const { PlayerObj, dispatch }  = useContext(PlayerContext)
    const { OpponentObj, dispatchOpp } = useContext(OpponentContext)
    const { FightRounds, dispatchFight } = useContext(FightRoundsContext)

    let animationFrameId;

    // SET ROUNDS WITH CONTEXT, PASSING THE ROUNDS TO THIS USEFFECT DEPENDENCY ARRAY    
    useEffect(() => {
      
      canvas = canvasRef.current
      ctx = canvas.getContext('2d')
      console.log("USE EFFECT TRIGGERED")
      if(PlayerObj.is_attacking && OpponentObj.is_attacking) {
        dispatch({type: 'set_attack', payload: false});
        dispatchOpp({type: 'set_attack', payload: false});
        dispatchFight({type: 'next_round', payload: 1})
        return
      } else {
        AttackAnimation(PlayerObj, OpponentObj, canvas, ctx);
      }

    if(PlayerObj.is_attacking || OpponentObj.is_attacking) {   
      
      setTimeout(() => { 
        if(OpponentObj.hp < 0) {
          console.log("Stopped here!")
          return 
        } else {
          console.log("OpponentAttack set: true, Player take damage, PlayerAttack set: false")
          dispatchOpp({type: 'set_attack', payload: true});
          dispatch({type: 'attacked', payload: Math.floor(Math.random()*50)});
          dispatch({type: 'set_attack', payload: false});
        }}, 1000 )

      setTimeout(() => {    
        console.log("OpponentAttack set: false")  
        dispatchOpp({type: 'set_attack', payload: false})}, 2000 );

      if (!OpponentObj.is_attacking && !PlayerObj.is_attacking) {          
        console.log("IDLE TIME")
      } else {
        console.log("wtf? Player: " + PlayerObj.is_attacking + "| Opponent: " + OpponentObj.is_attacking)
      }

      return () => {
        window.cancelAnimationFrame(animationFrameId)
      } 
    }
  },[PlayerObj])
    
    return (
    <div>
      <div id="healthbars" data-testid="healthbars">
        <PlayerHealthBar PlayerObj={PlayerObj}/>
        <OpponentHealthBar OpponentObj={OpponentObj}/>
       </div>

       <div style={{align: "center"}}>
         <canvas ref={canvasRef} style={{ }} id="game-area" data-testid="game-area" /> 
       </div>
      
    </div>)
}


export default FightCanvas;