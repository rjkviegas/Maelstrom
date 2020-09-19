import React, { useRef, useContext} from 'react'
import OpponentContext from '../../../config/opponentContext';
import PlayerContext from '../../../config/playerContext';
import { OpponentHealthBar } from '../../healthbar/enemyHealthbar';
import PlayerHealthBar from '../../healthbar/healthbar';

export default function FightAnimation() {
    const canvasRef = useRef(null)
    const { PlayerObj }  = useContext(PlayerContext)
    const { OpponentObj } = useContext(OpponentContext)
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;


    // load image

    const images = {}
    images.player = new Image();
    images.player.src = './HeavyBandit.png';
    //images.player.src = './HeavyBanditReverse.png'

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
        constructor(actionArg, characterWidth, characterHeight) {
            this.width = characterWidth;
            this.height = characterHeight;
            this.frameX = 0
            this.x = 0; // starting point (on the canvas)
            this.y = 0; // starting point (on the canvas)
            this.speed = 20;
            this.runStartCoord = this.x + 700;
            this.runDistanceLeft = -100; //  SMALLER THE GREATER DISTANCE RUN LEFT!
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
            drawSprite(images.player, this.width * this.frameX, this.width * this.frameY, this.width, this.height, this.testOffset, this.y, this.width * 10, this.height * 10);
            // [this.endFrame, this.speed] = (this.action === 'idle') ? [3, 5] : [7, 20]   // parallel deconstruction + ternary to conditionally determine speed.
            this.endFrame = (this.action === 'idle') ? 3 : 7; // ternary  to determine where the frame ends
            if (this.frameX < this.endFrame) this.frameX++; else if (this.frameX === this.endFrame && this.action === 'die') return; else this.frameX = 0;
        }

        // difference between offset and the rundistance is the actual distance. Once express condition is met, execute the next sequence. e.g. run -> attack, attack -> run_back
        update() {
            switch(this.action){
                case 'run':
                    images.player.src = './HeavyBandit.png';
                    if (this.testOffset > this.runDistanceLeft) this.testOffset -= this.speed; else 
                    this.testOffset = this.runStartCoord;
                    if (this.testOffset <= this.runDistanceLeft) this.action = 'attack';
                    break;
                case 'attack':
                    images.player.src = './HeavyBandit.png';
                    this.frameY = 2;
                    if(this.frameX === 7) this.action = 'run_back';
                    break;    
                case 'run_back':
                    images.player.src = './HeavyBanditReverse.png'  
                    this.frameY = 1;
                    if (this.testOffset < this.runStartCoord) this.testOffset += this.speed; else
                    this.testOffset = this.runStartCoord;
                    if (this.testOffset >= this.runStartCoord) this.action = 'idle';
                    break;
                case 'idle':
                    images.player.src = './HeavyBandit.png';
                    this.frameY = 0; 
                    break;
                case 'die':
                    images.player.src = './HeavyBanditReverse.png';
                    this.frameY = 3;     
                    break;  
                default:
                    this.action = 'idle';
                    break;    
            }
        }
    }

    const characters = [];
    characters.push(new Character('die', 48, 48)); //, new Character('idle', 48, 48)

    // img = image =>  sX, sY, sW, sH = area we want to draw => dx, dY, dW, dH = destination on the canvas

    // sX, the distance of the frame from the left in the X plane
    // sY, distance of the frame from the top in Y plane
    // sW, the width of frame on the source image
    // sH, the height of the frame on the source image
    // dx, x coordinate to draw frame on canvas
    // dy, y coordinate to draw frame on canvas
    // dW, the width of the drawn image
    // dH, the height of the drawn image

    function drawSprite(img, sX, sY, sW, sH, dx, dY, dW, dH) {
        ctx.drawImage(img, sX, sY, sW, sH, dx, dY, dW, dH)
    }


    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        /* drawSprite(images.player, playerWidth * playerFrameX, playerWidth * playerFrameY, playerWidth, playerHeight, testOffset, playerY, playerWidth * 10, playerHeight * 10);
        if (playerFrameX < 7) playerFrameX++; else playerFrameX = 0; */
        console.log("test offset: " + testOffset + " || playerWidth : " + playerWidth + canvas.width)
        /* if (testOffset > playerWidth) testOffset -= playerSpeed; else testOffset = testOffset + 300 */
        characters[0].draw()
        characters[0].update()
    /*     characters[1].draw()
        characters[1].update() */
    }

    // run the animate function every 1000(ms) / frames || FPS

    window.onload = setInterval(animate, 1000/20);


    // Sprites don't get pixelate or stretch using following resize event listener functions. 
    window.addEventListener('resize', function() {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
    })

        
    return (
        <div>
        <div id="healthbars">
            <PlayerHealthBar PlayerObj={PlayerObj}/>
            <OpponentHealthBar OpponentObj={OpponentObj}/>
        </div>

 {/*        <div style={{align: "center"}}>
            <canvas ref={canvasRef} style={{ }} id="game-area" data-testid="game-area" /> 
        </div> */}
        
        </div>
        )

}