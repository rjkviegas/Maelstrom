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
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

function App() {

 
  const [PlayerObj, dispatch] = useReducer(playerReducer, new player())
  const [OpponentObj, dispatchOpp] = useReducer(opponentReducer, new opponent())
 
  return (
      <div className="App">
      <header className="App-header">
        <Router><h1>Maelstrom</h1>
          <Switch> 
            <Route exact path='/'>
              <Link to="/startgame" data-testid="menu_link">Start Game</Link>
              </Route>
            <Route exact path='/startgame'>
              <Link to="/play" data-testid="play_link">Menu</Link>
              {/* <Menu/> */}
            </Route>
            <Route exact path='/play'>
              <Link to="/fight" data-testid="fight">Fight</Link>
              <Link to="/shop">Shop</Link>
              <Link to="/character">Your character</Link>
            </Route>
            <Route exact path='/fight'>
              <PlayerContext.Provider value={{PlayerObj, dispatch}}>
                <OpponentContext.Provider value={{OpponentObj, dispatchOpp}}>
                  <FightCanvas/>
                  <Fight/>
                </OpponentContext.Provider>
              </PlayerContext.Provider>
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );

}

export default App;


