import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import backgroundMusic from './background_music.mp3'


let music = new Audio(backgroundMusic)
const playMusic = function() {
  music.play()
}

ReactDOM.render(
  
  <React.StrictMode>  
      <App /> 
  </React.StrictMode>,
  document.getElementById('root'),
  playMusic
);





// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
// import { createStore } from 'redux';
// import allReducer from './Reducers';
// import { Provider } from 'react-redux';

// export const store = createStore(
//   allReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   );

// ReactDOM.render(
//   <Provider store={store}>
//     <App/>
//   </Provider>,
//   document.getElementById('root')
// );

//ReactDOM.render(
 // <App/>,
 // document.getElementById('root')
//);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

/* import React from "react";
import { PlayerProvider } from "./Components/player/player-hook";
import { OpponentProvider } from "./Components/opponent/opponent-hook";
import { render } from "react-dom";
import App from "./App";

render (
  <OpponentProvider>
  <PlayerProvider>
    <App />
  </PlayerProvider>
  </OpponentProvider>,
  document.getElementById("root")
); */