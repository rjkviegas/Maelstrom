import { mushroomAttack } from "./mushroom_attack.js";
import { mushroomDead } from "../../classes/mushroom/mushroom_dead.js";
import { mushroomIdle } from "../../classes/mushroom/mushroom_idle.js";
import Character from "../character_super/character_super";

const STARTING_HITPOINTS = 100;
const DIVIDER = 5;
const REWARD_MONEY = 10;
const DEFAULT_BASE_DAMAGE = 30;

class Mushroom extends Character{
  constructor(idleImage = mushroomIdle, attackImage = mushroomAttack, deathImage = mushroomDead, deathFrameNumber = 3, idleSourceY = 0, deathSourceY = 0, attackSourceY = 0){
    super(idleImage, attackImage, deathImage, deathFrameNumber, idleSourceY, deathSourceY, attackSourceY)
    this.name = 'Mushroom';
    this.hp = STARTING_HITPOINTS
    this.MAX_HP = STARTING_HITPOINTS
    this.attackSound = new Audio("http://freesoundeffect.net/sites/default/files/monster-liquid-attack-sound-effect-50543213.mp3")
    this.deathSound = new Audio("http://freesoundeffect.net/sites/default/files/alien-monster-dying--1-sound-effect-73367310.mp3")
    this.is_attacking = false;
    this.money = REWARD_MONEY;
    this.experience = STARTING_HITPOINTS / DIVIDER;
    this.level = this.calculateLevel();
    this.baseDamage = DEFAULT_BASE_DAMAGE;
  }
}

export default Mushroom;
export {STARTING_HITPOINTS}