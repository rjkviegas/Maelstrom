import { Character } from './classes.js'


const wizard_starting_hitpoints = 50;
const wizard_run_right_distance = 50;
const wizard_death_frame = 6;
const images = {}
images.wizard = new Image();
images.wizard.src = 'assets/characterSprites/EvilWizard/Idle.png';

export class Wizard extends Character {
    constructor(actionArg ='run', imageSrc = images.wizard, characterWidth = 250, characterHeight = 250, startPosX = 0, startPosY = -25, offsetX = -80, imageForward = 'assets/characterSprites/EvilWizard/Run.png', imageReverse = 'assets/characterSprites/EvilWizard/RunReverse.png', imageRun = 'assets/characterSprites/EvilWizard/Run.png', imageRunback = 'assets/characterSprites/EvilWizard/RunReverse.png' , imageAttack = 'assets/characterSprites/EvilWizard/Attack1.png', imageDie = 'assets/characterSprites/EvilWizard/Death.png', imageIdle = 'assets/characterSprites/EvilWizard/Idle.png'){
        super(actionArg, imageSrc, characterWidth, characterHeight, startPosX, startPosY, offsetX, imageForward, imageReverse, imageRun, imageRunback, imageAttack, imageDie, imageIdle)
        // REFACTOR OUT INTO SUPER AFTER SEPARATED INTO OWN FILES
        this.action = actionArg
        this.name = 'placeholder'
        this.hp = wizard_starting_hitpoints
        this.MAX_HP = wizard_starting_hitpoints
        this.is_attacking = false
        this.toggleAttack = function() {
            return this.is_attacking = !this.is_attacking
        }
        // REFACTOR END

        this.runDistanceRight = wizard_run_right_distance;
        this.deathFrame = wizard_death_frame;
        this.getFrameYValues = function() {
            this.frameY = 0;
        }
        this.getFrameYValues();
        this.update = function () {
                switch (this.action) {
                    case 'run':
                        this.frameY = 0;
                        this.imageSrc.src = this.imageRun
                        if (this.testOffset < this.runDistanceRight)
                            this.testOffset += this.speed;
                        else 
                            this.testOffset = this.runStartCoord;
            
                        if (this.testOffset >= this.runDistanceRight) { 
                            this.action = 'attack';
            
                        }
                        break;
                    case 'attack':
                        this.frameY = 0;
                        this.imageSrc.src  = this.imageAttack;
                        if(this.frameX === 7) this.action = 'run_back';
                        break;
                    case 'run_back':  
                        this.frameY = 0;
                        this.imageSrc.src = 'assets/characterSprites/EvilWizard/RunReverse.png'
                        if (this.testOffset > this.runStartCoord)
                            this.testOffset -= this.speed;
                        else
                            this.testOffset = this.runStartCoord;
                        if (this.testOffset <= this.runStartCoord)
                            this.action = 'idle';
                        break;
                    case 'idle':
                        console.log("i am idle wizard")
                        this.imageSrc.src = this.imageIdle;
                        this.frameY = 0;
                        break;
                    case 'die':
                        this.endFrame = this.deathFrame;
                        this.frameY = 0;
                        this.imageSrc.src = this.imageDie;
                        break;  
                    default:
                        this.imageSrc.src = this.imageIdle;
                        this.action = 'idle';
                        break;    
                }

        }
    }  
}

export const wizardPlayer = new Wizard();