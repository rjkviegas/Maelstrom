import { kingAttack } from "../../characterAnimation/king/king_attack";
import { kingDeath } from "../../characterAnimation/king/king_dead";
import { kingIdle } from "../../characterAnimation/king/king_idle";

const STARTING_HITPOINTS = 185;

class King {
  constructor(idleImage = kingIdle, attackImage = kingAttack, deathImage = kingDeath, deathFrameNumber = 7){
    this.name = 'Opponent_Placeholder'
    this.hp = STARTING_HITPOINTS
    this.MAX_HP = STARTING_HITPOINTS
    this.is_attacking = false;
    this.money = 0
    this.idleSourceY = 0
    this.deathSourceY = 0
    this.attackSourceY = 0
    this.idleImage = idleImage
    this.attackImage = attackImage
    this.deathImage = deathImage
    this.deathFrameNumber = deathFrameNumber
    this.isDead = () => { return this.hp <= 0}
  }
}

export default King;