import React, { useContext } from 'react'
import PlayerContext from '../../config/playerContext.js'
import OpponentContext from '../../config/opponentContext.js'
import { useHistory } from "react-router-dom";
import FightRoundsContext from '../../config/fightRoundsContext.js'
import generateRandomOpponent from '../classes/opponentGenerator.js';

export default function Fight() {

    const { PlayerObj, dispatch }  = useContext(PlayerContext)
    const { OpponentObj, dispatchOpp } = useContext(OpponentContext);
    const { dispatchFight } = useContext(FightRoundsContext)
    const RUN_PENALTY_PERCENTAGE = 0.3
    const RUN_PENALTY_MINIMUM = 10
    let history = useHistory();

    const handleAttack = () => {
      if(PlayerObj.hp < 0) {return}
        dispatchFight({type: 'ADVANCED_ROUND', payload: 1})
        dispatch({type: 'SET_ATTACKING_STATUS', payload: true});
        dispatchOpp({type: 'ATTACKED', payload: Math.floor(Math.random()*(10 + PlayerObj.strength))});
    }

    function anyPlayerAttacking() {
      return (PlayerObj.is_attacking === true || OpponentObj.is_attacking === true) 
    }

    function bothAlive() {
      return OpponentObj.hp > 0 && PlayerObj.hp > 0
    }

    function anyDead() {
      return PlayerObj.hp <= 0 || OpponentObj.hp <= 0
    }

    function playerRewardCheck() {
      if (PlayerObj.hp <= 0 || OpponentObj.hp > 0) return; // OpponentObj hp check protects against running and still getting money!
      dispatch({type: 'MONEY_ADDED', payload: OpponentObj.money}) 
    }

    function handleNewFight() {
      playerRewardCheck() // position warning
      dispatch({type: 'SET_ATTACKING_STATUS', payload: false});
      dispatchOpp({type: 'SET_ATTACKING_STATUS', payload: false});
      dispatch({type: 'RESET', payload: {...PlayerObj, hp: PlayerObj.MAX_HP, is_attacking: false}})
      dispatchOpp({type: 'RESET', payload: generateRandomOpponent()})
      history.push("/play")
    }

    function handleRun() {
      let PENALTY = Math.max(PlayerObj.money * RUN_PENALTY_PERCENTAGE, RUN_PENALTY_MINIMUM) 
      if(PlayerObj.money - PENALTY < 0) {
        dispatch({type: 'MONEY_DEDUCTED', payload: {deduction: PlayerObj.money, escapes: 1} }); // Penalty for running? Can also just ignore this method and just handleNewFight();
      } else {
        dispatch({type: 'MONEY_DEDUCTED', payload: {deduction: PENALTY, escapes: 1}})
      }
      handleNewFight();
    }

    return (
    <div>
      { bothAlive() ? 
        (anyDead() ? 
          <div>Attack disappears</div> : 
          <div>
          <div><button data-testid = 'attack_button' style={{visibility: anyPlayerAttacking() && bothAlive() ? 'hidden' : 'visible' }} onClick={() =>handleAttack()}>Attack</button></div>
          <div><button data-testid = 'run_button' style={{visibility: anyPlayerAttacking() && bothAlive() ? 'hidden' : 'visible' }} onClick={() =>handleRun()}>Run</button></div>
          </div>
        ) : //MAIN FALSE
      (PlayerObj.hp <= 0 ? <div><h1 data-testid="lose-message">YOU LOSE</h1><div data-testid="goback-button"><button onClick={handleNewFight}>Go back</button></div> </div> : 
        <div><h1 data-testid="win-message">YOU WIN</h1> <div data-testid="goback-button"><button onClick={handleNewFight}>Go back</button></div></div>)
      }
    </div>
    )
}