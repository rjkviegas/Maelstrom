import React,{ useContext } from 'react'
import PlayerContext from '../../config/playerContext.js'
import { wizardIdle } from '../characterAnimation/wizard/wizard_idle.js'

const STARTING_HITPOINTS = 100;
const STARTING_GOLD = 0;

class player {

  constructor() {
    this.name = 'placeholder'
    this.hp = STARTING_HITPOINTS
    this.MAX_HP = STARTING_HITPOINTS
    this.is_attacking = false
    this.current_avatar = wizardIdle
    this.current_avatar_text = function() {
      if (this.current_avatar === wizardIdle ) { return "wizard idle" } else { return "wizard attacking"}
    }
    this.toggleAttack = function() {
      return this.is_attacking = !this.is_attacking
    }
    this.money = STARTING_GOLD;
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