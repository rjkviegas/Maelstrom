import React, { useEffect } from 'react';
import { OpponentHealthBar } from '../../Components/healthbar/enemyHealthbar'
import PlayerHealthBar from '../../Components/healthbar/healthbar'
import idleAnimation from '../characterAnimation/fightAnimation'

const FightCanvas = () => {

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
      <div data-testid="healthbars" id="healthbars">
        <PlayerHealthBar/>
        <OpponentHealthBar/>
      </div>
      <canvas data-testid="game-area" id="game-area"/> 
    </div>)
}


export default FightCanvas;