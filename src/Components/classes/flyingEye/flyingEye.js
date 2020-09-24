import { flyingEyeAttack } from "../../characterAnimation/flyingEye/flyingEye_attack.js";
import { flyingEyeDead } from "../../characterAnimation/flyingEye/flyingEye_dead.js";
import { flyingEyeIdle } from "../../characterAnimation/flyingEye/flyingEye_idle.js";
import Character from "../character_super/character_super";

const STARTING_HITPOINTS = 75;
const DIVIDER = 5;
const REWARD_MONEY = 10;
const DEFAULT_BASE_DAMAGE = 20;

class FlyingEye extends Character{
  constructor(idleImage = flyingEyeIdle, attackImage = flyingEyeAttack, deathImage = flyingEyeDead, deathFrameNumber = 3, idleSourceY = 0, deathSourceY = 0, attackSourceY = 0){
    super(idleImage, attackImage, deathImage, deathFrameNumber, idleSourceY, deathSourceY, attackSourceY)
    this.name = 'Flying Eye'
    this.hp = STARTING_HITPOINTS
    this.MAX_HP = STARTING_HITPOINTS
    this.is_attacking = false;
    this.money = REWARD_MONEY;
    this.experience = STARTING_HITPOINTS/DIVIDER;
    this.level = this.calculateLevel();
    this.baseDamage = DEFAULT_BASE_DAMAGE;
  }
}

export default FlyingEye;