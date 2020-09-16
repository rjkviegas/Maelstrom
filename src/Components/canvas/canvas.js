import React, { useRef, useEffect, useCallback } from 'react';
import healthbar from '../../Components/healthbar/healthbar'
import enemyHealthbar from '../../Components/healthbar/enemyHealthbar'
import { sprite, evilWizard2IdleImage } from '../../Components/characterAnimation/evilWizard2.js'

var canvas = document.getElementById("game-area");

    console.log(document.getElementById("game-area"))

    var evilWizard2Idle = sprite({
        context: canvas.getContext('2d'),
        width: 100,
        height: 100,
        image: evilWizard2IdleImage
    });

const Canvas = (props) => {

    const canvasRef = useRef(null)

    const draw = useCallback((ctx, frameCount) => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            
            ctx.beginPath()
            ctx.arc(50, (140 - 10*Math.sin(frameCount*0.05)**2), 10, 0, 2*Math.PI)
            ctx.arc(250, (140 - 10*Math.sin(0.15+frameCount*0.05)**2), 10, 0, 2*Math.PI)
            evilWizard2Idle.render()
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
         <canvas ref={canvasRef} id="game-area" style={{ height: "90%", width: "80%", position: "relative", padding:"10%", border: "solid 5px #000000"}} {...props}/> 
       </div>
    </div>)
}

export default Canvas
