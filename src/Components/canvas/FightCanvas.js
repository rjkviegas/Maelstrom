import { OpponentHealthBar } from '../../Components/healthbar/enemyHealthbar'
import React, { createRef, useRef, useEffect, useContext} from 'react';
import PlayerHealthBar from '../../Components/healthbar/healthbar'
import IdleAnimation from '../characterAnimation/idleAnimation'
import PlayerContext from '../../config/playerContext.js'
import OpponentContext from '../../config/opponentContext.js'
import AttackAnimation from '../characterAnimation/playerAttacking.js'
import { Opponent } from '../opponent/opponent';
import OpponentAttackAnimation from '../characterAnimation/opponentAttacking';
import PlayerSpecialAttackAnimation from '../characterAnimation/playerSpecialAttacking'
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
      //insert animation methods here
      if(PlayerObj.is_attacking && OpponentObj.is_attacking) {
        dispatch({type: 'set_attack', payload: false});
        dispatchOpp({type: 'set_attack', payload: false});
        dispatchFight({type: 'next_round', payload: 1})

        return
      } else {
        AttackAnimation(PlayerObj, OpponentObj, canvas, ctx);
      
        console.log(1)
      }

      if(PlayerObj.is_attacking && !OpponentObj.is_attacking) {
        if (OpponentObj.is_attacking || !PlayerObj.is_attacking) { return }
        console.log(2)
        //canvas.currentActor = "PlayerAttackAnimation"
        setTimeout(() => { 
          if(OpponentObj.hp < 0) {

            return 
          } else {
     
            dispatchOpp({type: 'set_attack', payload: true});
            dispatch({type: 'attacked', payload: Math.floor(Math.random()*10)});
            dispatch({type: 'set_attack', payload: false});
          }
        }, 1000 )
      } else if (OpponentObj.is_attacking && !PlayerObj.is_attacking) {
        if (!OpponentObj.is_attacking || PlayerObj.is_attacking) { return }
        console.log(3)
        
        setTimeout(() => { 
          //OpponentAttackAnimation(OpponentObj, canvas, ctx);    
          dispatchOpp({type: 'set_attack', payload: false})
        }, 2000 );
      } else if (PlayerObj.is_special_attacking) {
        console.log("special attack time!")
        
        PlayerSpecialAttackAnimation(PlayerObj, OpponentObj, canvas, ctx)
       
        setTimeout(() => { 
          if(OpponentObj.hp < 0) {

            return 
          } else {
         
            dispatchOpp({type: 'set_attack', payload: true});
            dispatch({type: 'attacked', payload: Math.floor(Math.random()*10)});
            dispatch({type: 'set_special_attack', payload: false});
            dispatch({type: 'set_attack', payload: false});
       
          
          }
        }, 1000 )
       console.log(4)
      } else {

        //IdleAnimation(PlayerObj, OpponentObj, canvas, ctx); 
      }
      return () => {
        window.cancelAnimationFrame(animationFrameId)
      }
    },[PlayerObj, OpponentObj, animationFrameId, canvasRef, dispatch, dispatchFight, dispatchOpp])
  
    
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