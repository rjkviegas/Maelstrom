import React from 'react'
import backgroundMusic from '../../media/background_music.mp3'
let music = new Audio(backgroundMusic)

export function BackgroundMusic() {
    const playMusic = function() {
        music.play()
        music.volume = 0.5
    }

    music.onload = playMusic()  

    const toggleSound = function() {
        music.paused ? music.play() : music.pause()
    }

    return (
        <div>
            <button onClick={() => toggleSound()} style={{paddingTop: '20px', background: 'none', borderStyle: 'none', color: 'whitesmoke'}}>Toggle Music</button>
        </div>
    ) 
}