import { Character } from "./classes";

const images = {}
images.bandit = new Image();
images.bandit.src = 'assets/characterSprites/bandit/HeavyBandit.png';


const bandit_starting_hitpoints = 150;
const bandit_run_distance_left = 50;
const bandit_death_frame = 7;
const bandit_width = 48;
const bandit_height = 48;
const bandit_starting_position_X = 0
const bandit_starting_position_Y = 98;
export class Bandit extends Character{
    constructor(actionArg = 'idle', imageSrc = images.bandit, characterWidth = bandit_width, characterHeight = bandit_height, startPosX = 80, startPosY = 95, offsetX = 150, imageForward = 'assets/characterSprites/bandit/HeavyBandit.png', imageReverse = 'assets/characterSprites/bandit/HeavyBanditReverse.png') {
        super(actionArg, imageSrc, characterWidth, characterHeight, startPosX, startPosY, offsetX, imageForward, imageReverse)
        this.name = 'Opponent_Placeholder'
        this.runDistanceLeft = bandit_run_distance_left;
        this.deathFrame = bandit_death_frame;
        this.hp = bandit_starting_hitpoints
        this.MAX_HP = bandit_starting_hitpoints
        this.getFrameYValues = function() {
            switch(this.action){
                case 'attack':
                    this.frameLimit = 7;
                    return this.frameY = 2;
                case 'run':
                    return this.frameY = 1;
                case 'run_back':
                    return this.frameY = 1;  
                case 'die':
                    return this.frameY = 4;
                case 'idle':
                    return this.frameY = 0;
                default:
                    return this.frameY = 0;   
            }
        }

        this.update = function() {
            switch(this.action){
                case 'run':
                    this.frameY = 1;
                    this.imageSrc.src = this.imageRun
      
                    if (this.testOffset > this.runDistanceLeft)
                        this.testOffset -= this.speed;
                    else 
                        this.testOffset = this.runStartCoord;
      
                    if (this.testOffset <= this.runDistanceLeft) { 
                        this.action = 'attack';
                        this.frameX = 0;
                    }
                    break;
                case 'attack':
                    this.frameY = 2;
                    this.imageSrc.src  = this.imageAttack;
                    if(this.frameX === 7) this.action = 'run_back';
                    break;
                case 'run_back':
                    this.frameY = 1;
                    this.imageSrc.src = this.imageRunback;
                    if (this.testOffset < this.runStartCoord) this.testOffset += this.speed; else
                    this.testOffset = this.runStartCoord;
                    if (this.testOffset >= this.runStartCoord) this.action = 'idle';
                    break;
                case 'idle':
                    this.imageSrc.src = this.imageIdle;
                    this.frameY = 0; 
                    break;
                case 'die':
                    this.imageSrc.src = this.imageDie;
                    this.endFrame = 3;
                    this.frameY = 3;
                    break;  
                default:
                    this.imageSrc.src = this.imageIdle;
                    this.action = 'idle';
                    break;    
            }
        }
    } 
}

export const banditPlayer = new Bandit(); //, new Character('idle', 48, 48)