import { kingAttack } from "../../characterAnimation/king/king_attack";
import { kingDeath } from "../../characterAnimation/king/king_dead";
import { kingIdle } from "../../characterAnimation/king/king_idle";
import Character from "../character_super/character_super";

const STARTING_HITPOINTS = 185;

class King extends Character{
  constructor(idleImage = kingIdle, attackImage = kingAttack, deathImage = kingDeath, deathFrameNumber = 7, idleSourceY = 0, deathSourceY = 0, attackSourceY = 0){
    super(idleImage, attackImage, deathImage, deathFrameNumber, idleSourceY, deathSourceY, attackSourceY)
    this.name = 'Opponent_Placeholder'
    this.hp = STARTING_HITPOINTS
    this.MAX_HP = STARTING_HITPOINTS
    this.is_attacking = false;
    this.money = 0
  }
}

export default King;