import React, { useContext, useEffect, useState } from 'react'
import PlayerContext from '../../config/playerContext.js'
import OpponentContext from '../../config/opponentContext.js'
import { Player } from '../../Components/player/player.js'
import opponent,{ Opponent } from '../../Components/opponent/opponent.js'
import { Link } from 'react-router-dom'
import FightRoundsContext from '../../config/fightRoundsContext.js'

export default function Fight() {

    const { PlayerObj, dispatch }  = useContext(PlayerContext)
    const { OpponentObj, dispatchOpp } = useContext(OpponentContext);
    const { FightRounds, dispatchFight } = useContext(FightRoundsContext)

    const handleAttack = () => {
      if(PlayerObj.hp < 0) { 
        return 
      } else {
        dispatchFight({type: 'next_round', payload: 1})
        dispatch({type: 'set_attack', payload: true});
        dispatchOpp({type: 'attacked', payload: Math.floor(Math.random()*1000)});
      }
    }

    function handleNewFight(){
      dispatch({type: 'set_attack', payload: false});
      dispatchOpp({type: 'set_attack', payload: false});
      dispatch({type: 'reset', payload: {...PlayerObj, hp: PlayerObj.MAX_HP}})
      dispatchOpp({type: 'reset', payload: new opponent()})
    }

    return (
    <div>
      {OpponentObj.hp > 0 && PlayerObj.hp > 0 ? 
        (PlayerObj.hp <= 0 || OpponentObj.hp <= 0 ? 
          <div>Attack disappears</div> : 
          <div><button data-testid = 'attack_button' style={{visibility: (PlayerObj.is_attacking === true && OpponentObj.is_attacking === true) ? 'hidden' : 'visible' }} onClick={() =>handleAttack()}>Attack</button></div>) : //MAIN FALSE
      (PlayerObj.hp <= 0 ? <div><h1>YOU LOSE</h1><div><button onClick={handleNewFight}><Link to='/play'>Go back</Link></button></div> </div> : 
        <div><h1>YOU WIN</h1> <div><button onClick={handleNewFight}><Link to='/play'>Go back</Link></button></div></div>)}

    </div>
    )
}