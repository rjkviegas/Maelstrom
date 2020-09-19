import React, { useRef, useContext, useEffect, createRef } from 'react'
import { render } from 'react-dom';
import OpponentContext from '../../../config/opponentContext';
import PlayerContext from '../../../config/playerContext';
import { OpponentHealthBar } from '../../healthbar/enemyHealthbar';
import PlayerHealthBar from '../../healthbar/healthbar';

export function Canvas(props) {
    const canvasRef = React.createRef(null)
    let animationFrameId;
    
    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        FightAnimation(canvas, ctx)
    });
    
    return (
        <div>
            <canvas ref={canvasRef} id="game-area"></canvas>
        </div>
    )

    
}

let animation, now, elapsed, fpsInterval, then, startTime
let fps = 24

export default function FightAnimation(canvas, ctx) {
    function startAnimating(fps) {
        fpsInterval = 1000 / fps
        then = Date.now();
        startTime = then;
        animate();
    }

    // load image

    const images = {}
    images.wizard = new Image();
    images.wizard.src = 'assets/characterSprites/EvilWizard/Run.png';
    images.wizard.onload = drawImageMock
    images.player = new Image();
    images.player.src = 'assets/characterSprites/bandit/HeavyBandit.png';
    images.player.onload = drawImageMock

    function drawImageMock() {
        // ctx.drawImage(this, 0, 0, 48, 48, 0, 0, 48, 48);
        // setInterval(animate, 1000 / 8);
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

    // where to draw the frame in canvas
    let playerX = 0;
    let playerY = 0;
    let testOffset = playerX + 300;
    const playerSpeed = 6;

    const characterActions = [ 'attack', 'run','idle']

    class Character {
        constructor(imageSrc, actionArg, characterWidth, characterHeight, startPosX = 0, startPosY = 0, imageForward, imageReverse) {
            this.imageSrc = imageSrc
            this.imageForward = imageForward
            this.imageReverse = imageReverse

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
            if (this.frameX < this.endFrame)
                this.frameX++;
            else if (this.frameX === this.endFrame && this.action === 'die')
                return;
            else this.frameX = 0;
        }

        // difference between offset and the rundistance is the actual distance. Once express condition is met, execute the next sequence. e.g. run -> attack, attack -> run_back
        update() {
            switch(this.action){
                case 'run':
                    images.player.src = this.imageForward

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
                    images.player.src = this.imageForward
                    this.frameY = 2;
                    if(this.frameX === 7) this.action = 'run_back';
                    break;
                case 'run_back':
                    images.player.src = this.imageReverse  
                    this.frameY = 1;
                    if (this.testOffset < this.runStartCoord) this.testOffset += this.speed; else
                    this.testOffset = this.runStartCoord;
                    if (this.testOffset >= this.runStartCoord) this.action = 'idle';
                    break;
                case 'idle':
                    images.player.src = this.imageForward;
                    this.frameY = 0; 
                    break;
                case 'die':
                    images.player.src = this.imageReverse  
                    this.frameY = 3;
                    break;  
                default:
                    images.player.src = this.imageForward
                    this.action = 'idle';
                    break;    
            }
        }
    }

    const characters = {};
    characters.player = new Character(images.player, 'run', 48, 48, 0, 100, 'assets/characterSprites/bandit/HeavyBandit.png', 'assets/characterSprites/bandit/HeavyBanditReverse.png'); //, new Character('idle', 48, 48)

    characters.oppenent =  new Character(images.wizard, 'idle', 250, 250, -250, -25, 'assets/characterSprites/EvilWizard/Run.png', 'assets/characterSprites/EvilWizard/Run.png');

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

            characters.oppenent.draw()
            // characters.oppenent.update()
        }
    }

}

