import OpponentHealthBar from '../../Components/healthbar/enemyHealthbar'
import React, { createRef, useEffect, useContext } from 'react';
import PlayerHealthBar from '../../Components/healthbar/playerHealthbar'
import PlayerContext from '../../config/playerContext.js'
import OpponentContext from '../../config/opponentContext.js'
import AttackAnimation from '../characterAnimation/FightAnimation.js'
import FightRoundsContext from '../../config/fightRoundsContext';

let canvas;
let ctx;
// let cancelAnimationFrame = window.requestAnimationFrame 
//                           || window.mozRequestAnimationFrame
//                           || window.webkitRequestAnimationFrame
//                           || window.msRequestAnimationFrame
//                           ;
const TIMER_DELAY = 500;
const FIRST_TIME_DELAY = TIMER_DELAY * 2;
const SECOND_TIME_DELAY = TIMER_DELAY * 3;

const FightCanvas = () => {
  
    let canvasRef = createRef(null)
    const { PlayerObj, dispatch }  = useContext(PlayerContext)
    const { OpponentObj, dispatchOpp } = useContext(OpponentContext)
    const { dispatchFight } = useContext(FightRoundsContext)
    
    let animationFrameId;
   
    useEffect(() => {
      
      canvas = canvasRef.current
      ctx = canvas.getContext('2d')

      AttackAnimation(PlayerObj, OpponentObj, canvas, ctx);

      if(PlayerObj.is_attacking && OpponentObj.is_attacking) {
        dispatch({type: 'SET_ATTACKING_STATUS', payload: false});
        dispatchOpp({type: 'SET_ATTACKING_STATUS', payload: false});
        dispatchFight({type: 'ADVANCED_ROUND', payload: 1});
        return
      } 
  
      if (PlayerObj.is_attacking || OpponentObj.is_attacking) {   
        if(PlayerObj.is_attacking) { console.log("PlayerObj attacking", PlayerObj)}
        if (OpponentObj.is_attacking) { console.log("OpponentObj attacking", OpponentObj)}
        setTimeout(() => { 
            if (OpponentObj.hp <= 0) {return}; 
            
            let damage = Math.floor((Math.random() * OpponentObj.baseDamage)*(10/(10+PlayerObj.defence)));
            dispatchOpp({type: 'SET_ATTACKING_STATUS', payload: true});
            dispatch({type: 'ATTACKED', payload: ((damage < 0) ? 0 : damage) });
            dispatch({type: 'SET_ATTACKING_STATUS', payload: false});
        }, FIRST_TIME_DELAY )

        setTimeout(() => {    
          dispatchOpp({type: 'set_attack', payload: false})
        }, SECOND_TIME_DELAY );

        return () => {
          window.cancelAnimationFrame(animationFrameId)
        } 
      }
    },[PlayerObj]) // eslint-disable-line 
    
    return (
    <div>
      <div id="player_stats">
        <p id="stat">victories: {PlayerObj.victories}</p>
      </div>
      
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
export {FIRST_TIME_DELAY as FIRST_DELAY};
export {SECOND_TIME_DELAY as SECOND_DELAY};