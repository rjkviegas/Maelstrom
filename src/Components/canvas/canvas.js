import React, { useRef, useEffect, useCallback } from 'react';
import healthbar from '../../Components/healthbar/healthbar'
import enemyHealthbar from '../../Components/healthbar/enemyHealthbar'
import Sprite from '../../Components/characterAnimation/evilWizard2.js'

const Canvas = (props) => {

    const canvasRef = useRef(null)

    const draw = useCallback((ctx, frameCount) => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            
            ctx.beginPath()
            ctx.arc(50, (140 - 10*Math.sin(frameCount*0.05)**2), 10, 0, 2*Math.PI)
            ctx.arc(250, (140 - 10*Math.sin(0.15+frameCount*0.05)**2), 10, 0, 2*Math.PI)
            
            // ctx.canvas.width = 300
            // ctx.canvas.height = 150
            ctx.fillStyle = '#7FFFD4';
            ctx.fill();
        }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        
        let frameCount = 0
        let animationFrameId
        // started here 
        const evilWizard2IdleImage = new Image();
    evilWizard2IdleImage.src = "public/assets/characterSprites/EVil Wizard 2/Idle.png"

    function Sprite(img, width, height, positions){
       
    this.img = img;
    this.width = width;
    this.height = height;
    this.positions = positions;
    
    var spriteWidth  = 350,
    spriteHeight = 170,
    pixelsLeft   = 170,
    pixelsTop    = 10,

    // Where are we going to draw
    // the sprite on the canvas
    canvasPosX   = 20,
    canvasPosY   = 20
;

context.drawImage(img,
    pixelsLeft,
    pixelsTop,
    spriteWidth,
    spriteHeight,
    canvasPosX,
    canvasPosY,
    spriteWidth,
    spriteHeight
);

    function draw (position, x, y) {
        var pos = this.positions[position];
        context.drawImage(
          this.img,
          pos[0],
          pos[1],
          this.width,
          this.height,
          x, y,
          this.width,
          this.height
        );
        }
    return draw;
  };
  
  const sprite = new Sprite(evilWizard2IdleImage, 32, 16, [
    // specify a few sprite locations
    [10, 523],  // green
    [131, 523], // pink
    [191, 523]  // hit
  ]);
   sprite.draw(0, 10, 200);


  //ended here
       

        const render = () => {
           
            frameCount++
            draw(context, frameCount)
            
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return () => {
    
            window.cancelAnimationFrame(animationFrameId)
        } 
    }, [draw])
    
    return (
    <div>
       { healthbar } 
       { enemyHealthbar }

       <div>
         <canvas ref={canvasRef} style={{ height: "90%", width: "80%", position: "relative", padding:"10%", border: "solid 5px #000000"}} id="game-area"{...props}/> 
       </div>
      
    </div>)
}


export default Canvas
