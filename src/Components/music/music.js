import React from 'react'
import backgroundMusic from '../../media/background_music.mp3'


export function BackgroundMusic() {

    let music = new Audio(backgroundMusic)

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
            <button onClick={() => toggleSound()} style={{paddingTop: '20px', background: 'none', borderStyle: 'none'}}>Mute background music</button>
        </div>
    ) 
}