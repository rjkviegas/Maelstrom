import React,{ useContext } from 'react'
import PlayerContext from '../../config/playerContext.js'
import wizardIdle from '../characterAnimation/wizard/wizard_idle.js'

const starting_hitpoints = 100;
class player {

  constructor() {
    this.name = 'placeholder'
    this.hp = starting_hitpoints
    this.MAX_HP = starting_hitpoints
    this.is_attacking = false
    
    this.toggleAttacking = function() {
      this.is_attacking = !this.is_attacking
    }
  }

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