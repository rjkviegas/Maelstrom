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
  const { PlayerObj }  = useContext(PlayerContext)
  return (
    <div>
      <div data-testid="player_name" id="player_name">{ PlayerObj.name }</div>
      <div data-testid="player_hp" id="player_hp"> {PlayerObj.hp}</div>
    </div>
  )
}