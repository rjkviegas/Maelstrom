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
  const [PlayerObj, dispatch] = useReducer(playerReducer, player)
  const [OpponentObj, dispatchOpp] = useReducer(opponentReducer, opponent)
  return (
      <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route exact path='/'>
              <Link to="/menu">Menu</Link>
              </Route>
            <Route exact path='/menu'>
              <Link to="/play">Play Game</Link>
              {/* <Menu/> */}
            </Route>
            <Route exact path='/play'>
              <Link to="/fight">Fight</Link>
              <Link to="/shop">Shop</Link>
              <Link to="/character">Your character</Link>
            </Route>
            <Route exact path='/fight'>
              <PlayerContext.Provider value={{PlayerObj, dispatch}}>
                <OpponentContext.Provider value={{OpponentObj, dispatchOpp}}>
                  <FightCanvas/>
                  <Fight/>
                  <div style={{visibility: (OpponentObj.hp <= 0) ? "visible" : "hidden" }}><Link to='/'>Go back</Link></div>
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


