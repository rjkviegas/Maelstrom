import { banditAttack } from "../../characterAnimation/bandit/bandit_attack.js";
import { banditDead } from "../../characterAnimation/bandit/bandit_dead.js";
import { banditIdle } from "../../characterAnimation/bandit/bandit_idle.js";
import Character from "../character_super/character_super.js";


const STARTING_HITPOINTS = 125;
const DIVIDER = 5;
const REWARD_MONEY = 50;
const DEFAULT_BASE_DAMAGE = 15;


class Bandit extends Character {

  constructor(idleImage = banditIdle, attackImage = banditAttack, deathImage = banditDead, deathFrameNumber = 7, idleSourceY = 0, deathSourceY = 3, attackSourceY = 2){
    super(idleImage, attackImage, deathImage, deathFrameNumber, idleSourceY, deathSourceY, attackSourceY)
    this.name = 'Opponent_Placeholder'
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

export default Bandit;
