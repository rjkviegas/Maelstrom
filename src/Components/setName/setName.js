import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import PlayerContext from '../../config/playerContext'

export default function PlayerName() {
    
    const { dispatch }  = useContext(PlayerContext);
    const [name, setName] = useState("");
    let message = ""
    const nameLimit = 3
    const emptyName = "Enter a name"
    const notEnoughCharactersInName = "You need at least " + nameLimit + " characters in your name"
    const whiteSpaceInName = "Your name cannot contain any spaces"
    let history = useHistory()
    function valid() {
        if(name === "") { message = emptyName ;return false; }
        if(name.length < nameLimit ) { message = notEnoughCharactersInName; return false; }
        if(name.match(/\s/)) { message = whiteSpaceInName ;  return false; }
        return true
    }
    function handleChange(e) {
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch({type: "PLAYER_RENAMED", payload: name});
        history.push('/play');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text-field" placeholder="Enter name..." 
                onChange={handleChange}/>
                    {(!valid() || name === '') && <div style={{ fontWeight: 'bold', margin: '10px' }}>{message}</div>}
                <button data-testid="submit_name" id="submit_name" type="submit" 
                    style={{visibility: valid() ? 'visible' : 'hidden'}} 
                    onClick={handleSubmit} disabled={!valid()}>Submit name
                </button>          
            </form>
        </div>
    )
}  
