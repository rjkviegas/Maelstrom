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
    this.money = 15
    this.attackSound = new Audio('http://freesoundeffect.net/sites/default/files/swordstrike-s08wa-1732-sound-effect-77188111.mp3')
    this.deathSound = new Audio("https://opengameart.org/sites/default/files/5_1.mp3")
  }
}

export default King;