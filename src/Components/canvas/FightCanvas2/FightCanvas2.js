import React, { useRef, useContext, useEffect, createRef, useState } from 'react'
import { render } from 'react-dom';
import OpponentContext from '../../../config/opponentContext';
import PlayerContext from '../../../config/playerContext';
import { OpponentHealthBar } from '../../healthbar/enemyHealthbar';
import PlayerHealthBar from '../../healthbar/healthbar';
import { Sprite } from '../../player/sprite';

let canvas, ctx
export function Canvas(props) {
    const canvasRef = useRef(null)
    const { PlayerObj, dispatch }  = useContext(PlayerContext)
    const { OpponentObj, dispatchOpp } = useContext(OpponentContext)
    let log = console.log
    log(PlayerObj, OpponentObj)
    useEffect(() => {
        canvas = canvasRef.current
        ctx = canvas.getContext('2d')
        drawAnimation(canvas, ctx, PlayerObj, OpponentObj);
    }, [PlayerObj, OpponentObj]);

    return (
        <div>
                        <div>{JSON.stringify(PlayerObj.action)}</div>
                        {    console.log(PlayerObj.frameX)}
            <div id="healthbars">
            <div><PlayerHealthBar PlayerObj={PlayerObj} style={{fontSize:  "10px"}}/>{PlayerObj.name}: {PlayerObj.hp}</div>
            <div style={{fontSize:  "10px"}}><OpponentHealthBar OpponentObj={OpponentObj}/>{OpponentObj.name}: {OpponentObj.hp}</div>
            </div>
        
            <div style={{align: "center"}}>
                <canvas ref={canvasRef} id="game-area" data-testid="game-area"></canvas>
            </div>
        </div>
    )
}

let animation, now, elapsed, fpsInterval, then, startTime
let fps = 16

export default function drawAnimation(canvas, ctx, player, opponent) {
    // console.log(player_action, opponent_action)
    let arr = []
    arr.push(player.action)
    console.log(player.action)
    console.log(arr)
    function startAnimating(fps) {
        fpsInterval = 1000 / fps
        then = Date.now();
        startTime = then;
        animate();
    }

    startAnimating(fps)

    // How big is each individual frame. Find image properties via right click (image) > image properties.
    // Calculate width via image length (width) by the sprite column count
    // Calculate height via image height by the rows column count 

    const playerWidth = 48;
    const playerHeight = 48;

    //coord of frame to draw in sprite sheet
    let playerFrameX = 0;
    let playerFrameY = 2;

    const characterActions = ['attack', 'run','idle']

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
            player.draw(animation, ctx)
            player.update()
            
            opponent.draw(animation, ctx)
            opponent.update()
        }
    }

    return () => {
        //window.cancelAnimationFrame(animation)
    }
}

