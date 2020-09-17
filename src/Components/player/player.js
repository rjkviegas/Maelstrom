
import React,{ useContext } from 'react'
import PlayerContext from '../../config/playerContext.js'

const starting_hitpoints = 100;
const player = {
  name: 'placeholder',
  hp: starting_hitpoints,
  MAX_HP: starting_hitpoints,
}


export default player;

export function Player() { 
  const { PlayerObj, dispatch }  = useContext(PlayerContext)
  return (
    <div>
      { PlayerObj.name }
    </div>
  )
}
