import { kingAttack } from "../../characterAnimation/king/king_attack";
import { kingDeath } from "../../characterAnimation/king/king_dead";
import { kingIdle } from "../../characterAnimation/king/king_idle";
import Character from "../character_super/character_super";

const STARTING_HITPOINTS = 500;
const DIVIDER = 5;
const REWARD_MONEY = 50;
const DEFAULT_BASE_DAMAGE = 50;

class King extends Character{
  constructor(idleImage = kingIdle, attackImage = kingAttack, deathImage = kingDeath, deathFrameNumber = 7, idleSourceY = 0, deathSourceY = 0, attackSourceY = 0){
    super(idleImage, attackImage, deathImage, deathFrameNumber, idleSourceY, deathSourceY, attackSourceY)
    this.name = 'King Valdir'
    this.hp = STARTING_HITPOINTS
    this.MAX_HP = STARTING_HITPOINTS
    this.money = REWARD_MONEY
    this.attackSound = new Audio('http://freesoundeffect.net/sites/default/files/swordstrike-s08wa-1732-sound-effect-77188111.mp3')
    this.deathSound = new Audio("https://opengameart.org/sites/default/files/5_1.mp3")
    this.experience = STARTING_HITPOINTS/DIVIDER;
    this.level = this.calculateLevel();
    this.baseDamage = DEFAULT_BASE_DAMAGE;
  }
}

export default King;
export {STARTING_HITPOINTS};