import React, { useState, useReducer, useContext } from 'react';
import './App.css';
import Menu from './Components/menu/menu.js'
import PlayerContext from './config/playerContext.js';
import playerReducer from './Reducers/playerReducer.js'
import player from './Components/player/player.js'
import FightCanvas from './Components/canvas/FightCanvas'
import { Player } from './Components/player/player.js'

function App() {
  const [PlayerObj, dispatch] = useReducer(playerReducer, player)
  return (
    <div className="App">
      <header className="App-header">
      <PlayerContext.Provider value={{PlayerObj, dispatch}}>
        <FightCanvas/>
        <Player/>
        <Menu/>
      </PlayerContext.Provider>
      </header>
    </div>
  );

}

export default App;


