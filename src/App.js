import React, { useState } from 'react';
import './App.css';
import './Components/healthbar/healthbar.css'
import { useSelector, useDispatch } from 'react-redux';
import { attack, rename } from './Actions';
import Menu from './Components/menu/menu.js'
import Canvas from './Components/canvas/canvas'

export default function App() {
  return (
    <Menu/>
  )
}

/* 
function App() {

  const [value, setValue] = useState('');
  const player = useSelector(state => state.player )

  const dispatch = useDispatch();
  const [playerName, updatePlayerName] = useState('')
  
  
  const onSubmit = function(e) {
    e.preventDefault();
    updatePlayerName(value);
    dispatch(rename(value, player))
  }
  return (
    <div className="App" >
      <div id='interface' style={{ visibility : (player.name === 'placeholder') ? 'visible' : 'hidden'}}>
      <h1>Enter your name</h1>
      <form method={onSubmit}>
        <input type='text' name='name' placeholder="Enter your name"
        onChange={e => setValue(e.target.value)}
                        value={value}></input>
        <button onClick={onSubmit}>
          Submit
        </button>
      </form> 
      </div>
      <div id='game_interface' style={{ visibility : (player.name !== 'placeholder') ? 'visible' : 'hidden'}}>
      <h1>{player.hp}</h1>
      <button onClick={() => dispatch(attack(player))}>attack</button>
      <h1>Option 1 Hook useState: {playerName}</h1>
      <h1>Option 2 Redux state management: {player.name}</h1>
      </div>
      <Canvas />
    </div>
  );
}
 */
