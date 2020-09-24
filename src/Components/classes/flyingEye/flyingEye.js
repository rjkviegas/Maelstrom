import { flyingEyeAttack } from "../../characterAnimation/flyingEye/flyingEye_attack.js";
import { flyingEyeDead } from "../../characterAnimation/flyingEye/flyingEye_dead.js";
import { flyingEyeIdle } from "../../characterAnimation/flyingEye/flyingEye_idle.js";
import Character from "../character_super/character_super";

const STARTING_HITPOINTS = 10;

class FlyingEye extends Character{
  constructor(idleImage = flyingEyeIdle, attackImage = flyingEyeAttack, deathImage = flyingEyeDead, deathFrameNumber = 3, idleSourceY = 0, deathSourceY = 0, attackSourceY = 0){
    super(idleImage, attackImage, deathImage, deathFrameNumber, idleSourceY, deathSourceY, attackSourceY)
    this.name = 'Opponent_Placeholder'
    this.hp = STARTING_HITPOINTS
    this.MAX_HP = STARTING_HITPOINTS
    this.attackSound = new Audio("http://freesoundeffect.net/sites/default/files/goblin-little-grump-sound-effect-38494874.mp3")
    this.deathSound = new Audio("https://opengameart.org/sites/default/files/audio_preview/Goblin%20Scream.wav.mp3")
    this.is_attacking = false;
    this.money = 0
  }
}

export default FlyingEye;