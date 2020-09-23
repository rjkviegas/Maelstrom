import React, {useState} from 'react'
import backgroundMusic from '../../media/background_music.mp3'

let music = {}
music.background = new Audio(backgroundMusic)
music.fight = new Audio()

export function BackgroundMusic() {

    const [volume, setVolume] = useState(0.1)

    const playMusic = function() {
        music.background.loop = true;
        music.background.volume = volume
        music.background.play()
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