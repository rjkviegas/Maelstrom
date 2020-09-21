import React, { useContext, useEffect, useState } from 'react'
import PlayerContext from '../../config/playerContext.js'
import OpponentContext from '../../config/opponentContext.js'
import { Player } from '../../Components/player/player.js'
import { Opponent } from '../../Components/opponent/opponent.js'

export default function Fight() {

    const { PlayerObj, dispatch }  = useContext(PlayerContext)
    const {  OpponentObj, dispatchOpp } = useContext(OpponentContext)

    const handleAttack = () => {
      dispatchOpp({type: 'attacked', payload: 10});
      dispatch({type: 'attackAnimation', payload: true})
      dispatch({type: 'attacked', payload: 15})
      // changeAnimation(2000);
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
          <div><button onClick={() =>handleAttack()}>Attack</button></div>) : //MAIN FALSE
      (PlayerObj.hp <= 0 ? <div><h1>YOU LOSE</h1></div> : 
        <div><h1>YOU WIN</h1></div>)}
    </div>
    )
}