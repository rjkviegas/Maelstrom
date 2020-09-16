import React, { useRef, useEffect, useCallback } from 'react';
import healthbar from '../../Components/healthbar/healthbar'
import enemyHealthbar from '../../Components/healthbar/enemyHealthbar'
import Sprite from '../../Components/characterAnimation/evilWizard2.js'

const Canvas = (props) => {

    const canvasRef = useRef(null)

    const draw = useCallback((ctx, frameCount) => {
        
    //         ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            
    //         ctx.beginPath()
            
            
    //         ctx.arc(50, (140 - 10*Math.sin(frameCount*0.05)**2), 10, 0, 2*Math.PI)
    //         ctx.arc(250, (140 - 10*Math.sin(0.15+frameCount*0.05)**2), 10, 0, 2*Math.PI)
           
           
            
            
           
        
        
        
    //         // ctx.canvas.width = 300
    //         // ctx.canvas.height = 150
    //         ctx.fillStyle = '#7FFFD4';
    //         ctx.fill();
       
        
        }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        
        const img = new Image();
            img.src = "./assets/characterSprites/EVil Wizard 2/idle.png";
            img.onload = function () {
             init();
            };
            const scale = 1;
            const width = img.width/8;
            const height = img.height;
            const scaledWidth = width*scale;
            const scaledHeight = height*scale;

            function drawFrame(frameX, frameY, canvasX, canvasY) {
                context.drawImage(img,
                              frameX * width, (frameY * height)+20, width, height,
                              canvasX, canvasY, scaledWidth, scaledHeight);
              }

            
        
        let frameCount = 0
        let animationFrameId
        const cycleLoop = [0, 1, 2, 3, 4, 5, 6, 7];
        let currentLoopIndex = 0;
        let numberOfFramesPerCycle = 10;
        function render() {
            frameCount++
            if (frameCount < numberOfFramesPerCycle) {
                window.requestAnimationFrame(render);
                return;
              }
            frameCount = 0;
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawFrame(cycleLoop[currentLoopIndex], 0, 0, 0);
            currentLoopIndex++;
            console.log(currentLoopIndex)
            if (currentLoopIndex >= cycleLoop.length) {
                currentLoopIndex = 0;
            }
            window.requestAnimationFrame(render);
    
        }
        function init() {
            window.requestAnimationFrame(render);
          }
     
        return () => {
         
            window.cancelAnimationFrame(animationFrameId)
        
        } 
    }, [draw])
    
    return (
    <div>
       { healthbar } 
       { enemyHealthbar }

       <div>

         <canvas ref={canvasRef} style={{ height: "90%", width: "80%", position: "relative", padding:"9%", border: "solid 5px #000000"}} id="game-area"{...props}/> 
       </div>
       
      
    </div>)
}


export default Canvas
