import React from 'react'
import backgroundMusic from '../../media/background_music.mp3'

let music = {}
music.background = new Audio(backgroundMusic)
music.fight = new Audio()

export function BackgroundMusic() {
    const playMusic = function() {
        music.background.play()
        music.background.loop = true;
        music.background.volume = 0.3
    }

    music.background.onload = playMusic()  

    const toggleSound = function() {
        music.background.paused ? music.background.play() : music.background.pause()
    }

    return (
        <div>
            <button onClick={() => toggleSound()} style={{paddingTop: '20px', background: 'none', borderStyle: 'none', color: 'whitesmoke'}}>Toggle Music</button>
        </div>
    ) 
}