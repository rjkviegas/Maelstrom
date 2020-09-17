import React, { useRef, useEffect, useContext } from 'react';
import playerHealthBar from '../healthbar/healthbar'
import enemyHealthbar from '../healthbar/enemyHealthbar'
import playerContext from '../../config/playerContext.js'
const Canvas = (props) => {
    const { playerObj, dispatch } = useContext(playerContext)
    const canvasRef = useRef(null)

    const draw = (ctx, frameCount) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        
        ctx.beginPath()
        ctx.arc(50, (140 - 10*Math.sin(frameCount*0.05)**2), 10, 0, 2*Math.PI)
        ctx.arc(250, (140 - 10*Math.sin(0.15+frameCount*0.05)**2), 10, 0, 2*Math.PI)
        
        // ctx.canvas.width = 300
        // ctx.canvas.height = 150
        ctx.fillStyle = '#7FFFD4';
        ctx.fill();
    }

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
       {/* { playerHealthBar } 
       { enemyHealthbar } */}
       <div>
         <canvas ref={canvasRef} id='game-area' style={{ height: "90%", width: "80%", position: "relative", padding:"10px", border: "solid 5px #000000"}} {...props}/> 
       </div>
    </div>)
}

export default Canvas
