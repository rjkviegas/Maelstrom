import React, { useRef, useEffect } from 'react';

const Canvas = (props) => {

    const canvasRef = useRef(null)

    const draw = (ctx, frameCount) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillstyle = '#000000'
        ctx.beginPath()
        ctx.arc(50, 130, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
        ctx.arc(250, 130, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
        // ctx.canvas.width = 300
        // ctx.canvas.height = 150
        ctx.fill()
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

    return <canvas ref={canvasRef} className='fr' id="gameArea" data-testid='canvas' style={{ height: "90%", width: "80%", position: "relative", border: "solid 5px #000000" }} {...props}/>
}

export default Canvas
