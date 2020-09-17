import React, { useReducer } from 'react';
import './App.css';
import Menu from './Components/menu/menu.js'
import PlayerContext from './config/playerContext.js';
import playerReducer from './Reducers/playerReducer.js'
import player, { Player } from './Components/player/player.js'
import FightCanvas from './Components/canvas/FightCanvas.js'
import opponent, { Opponent } from './Components/opponent/opponent.js';
import OpponentContext from './config/opponentContext.js';
import opponentReducer from './Reducers/opponentReducer.js'
import Fight from './Components/fight/fight.js'
import PlayerHealthBar from './Components/healthbar/healthbar.js'


function App() {
  const [PlayerObj, dispatch] = useReducer(playerReducer, player)
  const [OpponentObj, dispatchOpp] = useReducer(opponentReducer, opponent)
  return (
      <div className="App">
      <header className="App-header">
      <PlayerContext.Provider value={{PlayerObj, dispatch}}>
        <FightCanvas/>
        <OpponentContext.Provider value={{OpponentObj, dispatchOpp}}>
          <Fight/>
          <Player/>
          <Opponent/>
        </OpponentContext.Provider>
        {/* <Menu/> */}
      </PlayerContext.Provider>
      </header>
    </div>
  );

}

export default App;


