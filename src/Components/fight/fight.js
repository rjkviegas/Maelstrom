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
    const RUN_PENALTY_MINIMUM = 5
    const DEATH_PENALTY = PlayerObj.money
    let history = useHistory();

    const handleAttack = () => {
      if(PlayerObj.hp < 0) {return}
        dispatchFight({type: 'ADVANCED_ROUND', payload: 1})
        dispatch({type: 'SET_ATTACKING_STATUS', payload: true});
        dispatchOpp({type: 'ATTACKED', payload: Math.floor(Math.random()*(PlayerObj.baseDamage + PlayerObj.strength))});
    }

    function anyPlayerAttacking() {
      return (PlayerObj.is_attacking === true || OpponentObj.is_attacking === true) 
    }

    function bothAlive() {
      return OpponentObj.hp > 0 && PlayerObj.hp > 0
    }

    function playerRewardCheck() {
      if (PlayerObj.hp <= 0 || OpponentObj.hp > 0) return; // OpponentObj hp check protects against running and still getting money!
      let level = (PlayerObj.experience + OpponentObj.experience) > PlayerObj.nextLevel() ? (PlayerObj.level + 1) : PlayerObj.level
      dispatch({type: 'FIGHT_WIN_REWARDS_GRANTED', payload: {addition: OpponentObj.money, experience: OpponentObj.experience, hp: PlayerObj.MAX_HP, is_attacking: false, level}}) 
    }

    function handleNewFight() {
      playerRewardCheck() // position warning
      if (PlayerObj.hp <= 0) dispatch({type: "PLAYER_DIED", payload: {hp: PlayerObj.MAX_HP, is_attacking: false, death_penalty: DEATH_PENALTY}}); 
      dispatchOpp({type: 'SET_ATTACKING_STATUS', payload: false}); // need to check if this line is needed. I suspect not.
      dispatchOpp({type: 'RESET', payload: generateRandomOpponent()})
      history.push("/play")
    }

    function handleRun() {
      let PENALTY = Math.max(PlayerObj.money * RUN_PENALTY_PERCENTAGE, RUN_PENALTY_MINIMUM) // Penalty is the larger of the two
      let FINAL_PENALTY = (PlayerObj.money - PENALTY < 0) ? PlayerObj.money : PENALTY // No negative money pls
      dispatch({type: 'PENALTY_DEDUCTED', payload: {deduction: FINAL_PENALTY, escapes: 1} }); // Penalty for running? Can also just ignore this method and just handleNewFight();
      handleNewFight();
    }

    return (
    <div>
      { bothAlive() ? 
        <div>
          <div><button data-testid = 'attack_button' style={{visibility: anyPlayerAttacking() && bothAlive() ? 'hidden' : 'visible' }} onClick={() =>handleAttack()}>Attack</button></div>
          <div><button data-testid = 'run_button' style={{visibility: anyPlayerAttacking() && bothAlive() ? 'hidden' : 'visible' }} onClick={() =>handleRun()}>Run</button></div>
        </div>
        : // EITHER IS DEAD
      (PlayerObj.hp <= 0 ? 
        <div><h1 data-testid="lose-message">YOU LOSE</h1><div data-testid="goback-button"><button onClick={handleNewFight}>You couldn't escape the maelstrom</button></div> </div> : 
        <div><h1 data-testid="win-message">YOU WIN</h1> <div data-testid="goback-button"><button onClick={handleNewFight}>You have evaded the maelstrom this time</button></div></div>)
      // Opponents have their own win(/loss?) button texts to provide to the player
      }
    </div>
    )
}

