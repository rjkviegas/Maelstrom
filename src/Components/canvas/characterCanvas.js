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

   /*  let history = useHistory()
    function handleClick() {
        history.push('/play');
    } */

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                <label>Rename</label>
                <input type="text" id="rename" onChange={e => handleChange(e)}/>
                <input type="submit" id="submit_rename"/>
                </form>
            </div>
            <div style={{fontSize: '12px', width: '700px', wordWrap: 'break-word'}}>{JSON.stringify(PlayerObj)}</div>
        </div>
    )
}



    



