import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import PlayerContext from '../../config/playerContext'

export default function PlayerName() {
    
    const { dispatch }  = useContext(PlayerContext);
    const [name, setName] = useState(null);
    
    let history = useHistory()
    function valid() {
        if(name === "") { return false }
        return true
    }
    function handleChange(e) {
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch({type: "PLAYER_RENAMED", payload: name})
        history.push('/play')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text-field" placeholder="Enter name..." onChange={handleChange}/>
                    {valid ? <div>Enter your name</div> : <div>Your name is not valid</div> }
                <button data-testid="submit_name" id="submit_name" type="submit" value="Create Player" style={{visibility: valid ? 'visible' : 'hidden'}} onClick={handleSubmit} disabled={!valid}>Submit name</button>          
            </form>
        </div>
    )
}  
