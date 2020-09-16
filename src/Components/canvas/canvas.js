import React, { useRef, useEffect, useCallback } from 'react';
import healthbar from '../../Components/healthbar/healthbar'
import enemyHealthbar from '../../Components/healthbar/enemyHealthbar'
import Sprite from '../../Components/characterAnimation/evilWizard2.js'

const Canvas = (props) => {

    const canvasRef = useRef(null)

    const draw = useCallback((ctx, frameCount) => {
        
            // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            
            // ctx.beginPath()
            
            
            // ctx.arc(50, (140 - 10*Math.sin(frameCount*0.05)**2), 10, 0, 2*Math.PI)
            // ctx.arc(250, (140 - 10*Math.sin(0.15+frameCount*0.05)**2), 10, 0, 2*Math.PI)
           
           
            
            
           
        
        
        
            // ctx.canvas.width = 300
            // ctx.canvas.height = 150
            // ctx.fillStyle = '#7FFFD4';
            // ctx.fill();
       
        
        }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        
        const img = new Image();
            img.src = "./assets/characterSprites/EVil Wizard 2/idle.png";
            img.onload = function () {
             init();
            };

            function init() {
              context.drawImage(img, 0,-20, img.width, img.height);
            }
        
        let frameCount = 0
        let animationFrameId

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

         <canvas ref={canvasRef} style={{ height: "90%", width: "80%", position: "relative", padding:"9%", border: "solid 5px #000000"}} id="game-area"{...props}/> 
       </div>
       
      
    </div>)
}


export default Canvas
