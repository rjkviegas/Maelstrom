import React, { useContext, useState } from 'react'
import PlayerContext from '../../config/playerContext';
import { useHistory } from "react-router-dom";

export default function CharacterCanvas() {

    const { PlayerObj, dispatch }  = useContext(PlayerContext)
    const [nameValue, setNameValue] = useState(PlayerObj.name)

    function handleSubmit(e) { 
        e.preventDefault(); 
        dispatch({type: 'PLAYER_RENAMED', payload: nameValue}); 
    }

    function handleChange(e) {
        setNameValue(e.target.value)
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                <label>Rename</label>
                <input type="text" id="rename" onChange={e => handleChange(e)}/>
                <input type="submit" id="submit_rename"/>
                </form>
            </div>
            <div style={{fontSize: '16px', width: '700px', wordWrap: 'break-word', paddingTop: '20px', paddingBottom: '20px'}}>
                <div data-testid="player_name" id="player_name">Name: {PlayerObj.name}</div>
                <div data-testid="base_damage" id="base_damage">Base Damage: {PlayerObj.baseDamage}</div>
                <div data-testid="strength" id="strength">Strength bonus: {PlayerObj.strength}</div>
                <div data-testid="defence" id="defence">Defence bonus: {PlayerObj.defence}</div>
            </div>
        </div>
    )
}



    



