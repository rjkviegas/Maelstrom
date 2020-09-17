import React, { useState, useContext } from 'react'
import playerReducer from '../../Reducers/playerReducer.js'
import PlayerContext from '../../config/playerContext.js'

export default function Rename() {
    const [name, setName] = useState('')
    const { PlayerObj, dispatch } = useContext(PlayerContext)
    return (
        <div>
            
        </div>
    )
}