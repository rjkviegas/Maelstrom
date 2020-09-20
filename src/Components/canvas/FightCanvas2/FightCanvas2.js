import React, { useRef, useContext, useEffect, createRef } from 'react'
import { render } from 'react-dom';
import OpponentContext from '../../../config/opponentContext';
import PlayerContext from '../../../config/playerContext';
import { OpponentHealthBar } from '../../healthbar/enemyHealthbar';
import PlayerHealthBar from '../../healthbar/healthbar';

export function Canvas(props) {
    const canvasRef = React.createRef(null)
    const { PlayerObj }  = useContext(PlayerContext)
    const { OpponentObj } = useContext(OpponentContext)
    let animationFrameId;
    
    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        FightAnimation(canvas, ctx, { player_action: "die" }, { opponent_action: "die" } );
        window.cancelAnimationFrame(animationFrameId)
    });
    
    return (
        <div>
            <div id="healthbars">
                <div><PlayerHealthBar PlayerObj={PlayerObj} style={{fontSize:  "10px"}}/>{PlayerObj.name}</div>
                <div style={{fontSize:  "10px"}}><OpponentHealthBar OpponentObj={OpponentObj}/>{OpponentObj.name}</div>
            </div>
            <div style={{align: "center"}}>
                <canvas ref={canvasRef} id="game-area"></canvas>
            </div>
        </div>
    )

    
}

let animation, now, elapsed, fpsInterval, then, startTime
let fps = 24

export default function FightAnimation(canvas, ctx, { player_action = "idle" }, { opponent_action ="idle" }) {
    console.log(player_action, opponent_action)
    function startAnimating(fps) {
        fpsInterval = 1000 / fps
        then = Date.now();
        startTime = then;
        animate();
    }
    console.log("RERENDER TRIGGERED")
    // load image

    const images = {}
    images.player = new Image();
    images.type = new Image();
    images.wizard = new Image();
    images.wizard.src = 'assets/characterSprites/EvilWizard/Idle.png';
    images.wizard.onload = drawImageMock
    images.bandit = new Image();
    images.bandit.src = 'assets/characterSprites/bandit/HeavyBandit.png';
    images.bandit.onload = drawImageMock

    function drawImageMock() {
        startAnimating(fps)
    }

    // How big is each individual frame. Find image properties via right click (image) > image properties.
    // Calculate width via image length (width) by the sprite column count
    // Calculate height via image height by the rows column count 

    const playerWidth = 48;
    const playerHeight = 48;

    //coord of frame to draw in sprite sheet
    let playerFrameX = 0;
    let playerFrameY = 2;

    const characterActions = ['attack', 'run','idle']

    class Character {

        constructor(type, imageSrc, actionArg, characterWidth, characterHeight, startPosX = 0, startPosY = 0, imageForward, imageReverse, imageRun, imageRunback, imageAttack, imageDie, imageIdle) {
        
            this.imageSrc = imageSrc
            this.imageForward = imageForward
            this.imageReverse = imageReverse
            this.imageRun = imageRun || imageForward;
            this.imageRunback = imageRunback || imageReverse;
            console.log(this.imageRunback, imageRunback)
            this.imageAttack = imageAttack || imageForward;
            this.imageIdle = imageIdle || imageForward;
            this.imageDie = imageDie || imageReverse;
            this.width = characterWidth;
            this.height = characterHeight;
            this.frameX = 0
            this.x = startPosX; // starting point (on the canvas)
            this.y = startPosY; // starting point (on the canvas)
            this.speed = 4;
            this.runStartCoord = this.x + 200;
            this.runDistanceLeft = 50; //  SMALLER THE GREATER DISTANCE RUN LEFT!
            this.runDistanceRight = 1500;
            this.testOffset = this.runStartCoord; // distance to travel
            this.endFrame = 7;
            this.action = actionArg
            this.deathFrame = 7
            this.getFrameYValues()
        }

        getFrameYValues() {
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


 
        draw() {
            if (animation) {
                window.cancelAnimationFrame(animation)
            }
            // const [posX, posY] = [200, 100] // Controls the location of the sprite on canvas


            ctx.drawImage(this.imageSrc, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.testOffset, this.y, this.width, this.height);

            // [this.endFrame, this.speed] = (this.action === 'idle') ? [3, 5] : [7, 20]   // parallel deconstruction + ternary to conditionally determine speed.
            this.endFrame = (this.action === 'idle') ? 3 : 7; // ternary  to determine where the frame ends
            this.endFrame = (this.action === 'die') ? this.deathFrame : this.endFrame
            if (this.frameX < this.endFrame)
                this.frameX++;
            else if (this.action === 'die') {
                if(this.frameX >= this.endFrame){
                    return
                }
            }
            else this.frameX = 0;
        }

        setAction(action) {
            this.action = action
        }

        // difference between offset and the rundistance is the actual distance. Once express condition is met, execute the next sequence. e.g. run -> attack, attack -> run_back
        update() {
            switch(this.action){
                case 'run':
                    this.frameY = 1;
                    this.imageSrc.src = this.imageForward

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

    class Bandit extends Character {
        runDistanceLeft = 50;
        deathFrame = 7;

        getFrameYValues() {
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

        update() {
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

    class Wizard extends Character {

        runDistanceRight = 50;
        deathFrame = 6;
        getFrameYValues() {
            switch(this.action){
                case 'attack':
                    this.frameLimit = 7;
                    return this.frameY = 0;
                case 'run':
                    return this.frameY = 0;
                case 'run_back':
                    return this.frameY = 0;  
                case 'die':
                    return this.frameY = 0;
                case 'idle':
                    return this.frameY = 0;
                default:
                    return this.frameY = 0;   
            }
        }

        update() {
            switch(this.action){
                case 'run':
                    this.frameY = 0;
                    this.imageSrc.src = this.imageRun
                    console.log("you got here " + this.imageSrc.src)
                    if (this.testOffset < this.runDistanceRight)
                        this.testOffset += this.speed;
                    else 
                        this.testOffset = this.runStartCoord;

                    if (this.testOffset >= this.runDistanceRight) { 
                        this.action = 'attack';
                        this.frameX = 0;
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
                    if (this.testOffset > this.runStartCoord) this.testOffset -= this.speed; else
                    this.testOffset = this.runStartCoord;
                    if (this.testOffset <= this.runStartCoord) this.action = 'idle';
                    break;
                case 'idle':
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

    const characters = {};

    // Create instance with syntax [IMAGE, METHOD, FRAMESIZEX, FRAMESIZEY, STARTING POSITION X, STARTING POSITION Y, ASSET SHEET WHEN FACING FORWARD, ASSET SHEET REVERSED ...]
    // ... ASSET SHEET RUN, ASSET SHEET ATTACK, ASSET SHEET RUN_BACK, ASSET SHEET IDLE, ASSET SHEET DIE]
    characters.opponent = new Bandit('bandit', images.bandit, opponent_action, 48, 48, 0, 95, 'assets/characterSprites/bandit/HeavyBandit.png', 'assets/characterSprites/bandit/HeavyBanditReverse.png'); //, new Character('idle', 48, 48)

    characters.player = new Wizard('wizard', images.wizard, player_action, 250, 250, -250, -25, 
    'assets/characterSprites/EvilWizard/Idle.png', 
    'assets/characterSprites/EvilWizard/Run.png', 
    'assets/characterSprites/EvilWizard/Run.png', 
    'assets/characterSprites/EvilWizard/RunReverse.png',
    'assets/characterSprites/EvilWizard/Attack1.png',
    'assets/characterSprites/EvilWizard/Death.png');
    // img = image =>  sX, sY, sW, sH = area we want to draw => dx, dY, dW, dH = destination on the canvas

    // sX, the distance of the frame from the left in the X plane
    // sY, distance of the frame from the top in Y plane
    // sW, the width of frame on the source image
    // sH, the height of the frame on the source image
    // dx, x coordinate to draw frame on canvas
    // dy, y coordinate to draw frame on canvas
    // dW, the width of the drawn image
    // dH, the height of the drawn image

    // function drawSprite(img, sX, sY, sW, sH, dx, dY, dW, dH) {
    //     ctx.drawImage(img, sX, sY, sW, sH, dx, dY, dW, dH)
    // }
    
    
    function animate() {
        requestAnimationFrame(animate);
        now = Date.now();
        elapsed = now - then;
        // if enough time has elapsed, draw the next frame
        if (elapsed > fpsInterval) {

            // Get ready for next frame by setting then=now, but also adjust for your
            // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
            then = now - (elapsed % fpsInterval);
            // Put your drawing code here

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            characters.player.draw()
            characters.player.update()

            characters.opponent.draw()
            characters.opponent.update()
        }
    }

    return (
        <div></div>
    )
}

