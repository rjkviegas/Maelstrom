import React, {useState} from 'react'
import backgroundMusic from '../../media/background_music.mp3'
import InputSlider from './slider'

let music = {}
music.background = new Audio(backgroundMusic)
music.fight = new Audio()

export function BackgroundMusic() {

    const [volume, setVolume] = useState(0.01)

    const playMusic = function() {
        music.background.loop = true;
        music.background.volume = volume
        music.background.play()
    }

    music.background.onload = playMusic()

    return (
        <div style={{paddingTop: '10px'}}>
            <InputSlider valueInc={setVolume}/>
        </div>
    ) 
}