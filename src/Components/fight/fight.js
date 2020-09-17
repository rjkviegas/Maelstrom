import React, { useContext, useState, useReducer } from 'react'
import playerReducer from '../../Reducers/playerReducer.js'
import PlayerContext from '../../config/playerContext.js'

export default function Fight() {
    const { PlayerObj, dispatch }  = useContext(PlayerContext)
    return (
    <div>
        <div>{PlayerObj.name} HP: {PlayerObj.hp}</div>
        <button onClick={() => dispatch({type: 'attack', payload: 10})}>Attack</button>
    </div>
    )
}


/* import React from 'react';
import Player from "../player/player";
import Opponent from "../opponent/opponent";
import { usePlayer } from "../player/player-hook";
import { useOpponent } from "../opponent/opponent-hook";

export default function Fight() {
  const { player } = usePlayer();
  const { opponent } = useOpponent();
  return (
    <div>
        Fight component
        Player One:
      {player.map(player => <Player {...player} />)}
        Player Two:
      {opponent.map(opponent => <Opponent {...opponent} />)}
    </div>
  )
} */