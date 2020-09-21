import React, { useContext } from 'react';
import './healthbar.css'
import PlayerContext from '../../config/playerContext.js'
// import domtoimage from 'dom-to-image';

function PlayerHealthBar(playerObj) {
  const { PlayerObj } = playerObj
  // const { PlayerObj, setPlayerObjValue } = useContext(PlayerContext)
  let barWidth = (PlayerObj.hp <= 0) ? "0%" : ((PlayerObj.hp)/PlayerObj.MAX_HP)*100 + '%'
  return (
    <div className="health-bar">
      <div className="health-bar-glass">
          <div className="health-bar-fluid anim-width" data-testid="player-health-bar" style={{width: barWidth}}></div>
      </div>
    </div>
  )
}

    // function renderPlayerHealthBar() {
    //   var node = PlayerHealthBar();
    //   const canvas = document.getElementById('game-area')
    //   const context = canvas.getContext('2d')

    //   const PlayerHealthBarImage = () => {  
    //     domtoimage.toPng(node)
    //       .then (function (dataUrl) {
    //           var img = new Image();
    //           img.src = dataUrl;
    //           document.appendChild(img);
    //       })
    //       .catch(function (error) {
    //           console.error('oops, something went wrong!', error);
    //       });
    //   }

    //   context.drawImage(PlayerHealthBarImage(), 0,0);
    //   }


export default PlayerHealthBar;

