import React, { useReducer } from 'react';
import './App.css';
import PlayerContext from './config/playerContext.js';
import playerReducer from './Reducers/playerReducer.js'
import Wizard from './Components/classes/wizard/wizard.js'
import FightCanvas from './Components/screens/FightCanvas.js'
import OpponentContext from './config/opponentContext.js';
import opponentReducer from './Reducers/opponentReducer.js'
import Fight from './Components/fight/fight.js'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { BackgroundMusic } from './Components/music/music';
import fightRoundsReducer from './Reducers/fightRoundsReducer';
import fightRounds from './Components/fight/fightRounds';
import FightRoundsContext from './config/fightRoundsContext';
import ShopCanvas from './Components/screens/shopCanvas';
import generateRandomOpponent from './Components/classes/opponentGenerator';
import CharacterScreen from './Components/screens/characterScreen';
import PlayerName from './Components/setName/setName.js'



function App() {

  const [FightRounds, dispatchFight] = useReducer(fightRoundsReducer, fightRounds)
  const [PlayerObj, dispatch] = useReducer(playerReducer, new Wizard())
  const [OpponentObj, dispatchOpp] = useReducer(opponentReducer, generateRandomOpponent())

  return (

      <div className="App">
      <header className="App-header">
        <Router><h1>Maelstrom</h1> 
          <Switch> 

            <Route exact path='/'>
              <Link to="/startgame" data-testid="menu_link">Start Game</Link>
            </Route>

            <Route exact path='/startgame'>
              <PlayerContext.Provider value={{PlayerObj, dispatch}}>
                <PlayerName/>
              </PlayerContext.Provider>
            </Route>

            <Route exact path='/play'>
              <Link to="/fight" data-testid="fight">Fight</Link>
              <Link to="/shop">Shop</Link>
              <Link to="/character">Your character</Link>
            </Route>

            <Route exact path='/character'>
              <PlayerContext.Provider value={{PlayerObj, dispatch}}>
                <CharacterScreen/>
                <Link to="/play">Go back</Link>
              </PlayerContext.Provider>
            </Route>

            <Route exact path='/shop'>
              <PlayerContext.Provider value={{PlayerObj, dispatch}}>
                <ShopCanvas />
              </PlayerContext.Provider>
            </Route>

            <Route exact path='/fight'>
              <PlayerContext.Provider value={{PlayerObj, dispatch}}>
                <OpponentContext.Provider value={{OpponentObj, dispatchOpp}}>
                  <FightRoundsContext.Provider value={{FightRounds, dispatchFight}}>
                    <FightCanvas/>
                    <Fight/>
                  </FightRoundsContext.Provider>
                </OpponentContext.Provider>
              </PlayerContext.Provider>
            </Route>

          </Switch>
        </Router>
        <BackgroundMusic/>
      </header>
    </div>
  );

}

export default App;


