import React, { useContext, useEffect, useState } from 'react'
import PlayerContext from '../../config/playerContext.js'
import OpponentContext from '../../config/opponentContext.js'
import { Player } from '../../Components/player/player.js'
import opponent,{ Opponent } from '../../Components/opponent/opponent.js'
import { Link } from 'react-router-dom'
export default function Fight() {

    const { PlayerObj, dispatch }  = useContext(PlayerContext)
    const {  OpponentObj, dispatchOpp } = useContext(OpponentContext);

    const handleAttack = () => {
      if(PlayerObj.hp < 0) { return }
      dispatch({type: 'set_attack', payload: true});
      dispatchOpp({type: 'attacked', payload: 20});

    
      /* setTimeout(() => { */
/*       dispatchOpp({type: 'set_attack', payload: true});
      dispatch({type: 'attacked', payload: 15}); */
      /* }, 1500) */
     
      // changeAnimation(2000);
    }

    function handleNewFight(){
      dispatch({type: 'set_attack', payload: false});
      dispatchOpp({type: 'set_attack', payload: false});
      dispatch({type: 'reset', payload: {...PlayerObj, hp: PlayerObj.MAX_HP}})
      dispatchOpp({type: 'reset', payload: new opponent()})
    }
    // const changeAnimation = (delay) => {
    //   dispatch({type: 'attackAnimation', payload: true})
    //   setTimeout(() => {
    //       console.log("Changing Animation");
    //       dispatch({type: 'attackAnimation', payload: false})
    //       }, delay)
    // }

    return (
    <div>
      {OpponentObj.hp > 0 && PlayerObj.hp > 0 ? 
        (PlayerObj.hp <= 0 || OpponentObj.hp <= 0 ? 
          <div>Attack disappears</div> : 
          <div><button style={{visibility: (PlayerObj.is_attacking === true && OpponentObj.is_attacking === true) ? 'hidden' : 'visible' }} onClick={() =>handleAttack()}>Attack</button></div>) : //MAIN FALSE
      (PlayerObj.hp <= 0 ? <div><h1>YOU LOSE</h1><div><button onClick={handleNewFight}><Link to='/play'>Go back</Link></button></div> </div> : 
        <div><h1>YOU WIN</h1> <div><button onClick={handleNewFight}><Link to='/play'>Go back</Link></button></div></div>)}

    </div>
    )
}