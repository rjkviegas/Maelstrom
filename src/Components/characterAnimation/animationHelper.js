/* if (isPlayerDead()) {
  if (!deathAnimSwitch && !finalSwing) {
    if (loopIndexIsEndFrame()) {
      deathAnimSwitch = true;
      finalSwing = true;
    }
    renderOpponentKillsPlayer();
  } else {
    renderOpponentIdle();
    renderPlayerDeathFrame();
  }
} else if (isOpponentDead()) {
  if (!deathAnimSwitch && !finalSwing) {
    if (loopIndexIsEndFrame()) { 
      deathAnimSwitch = true; 
      finalSwing = true;
    }
    renderPlayerKillsOpponent();
  } else {
    renderPlayerIdle();
    renderOpponentDeathFrame();         
  }         
} */

// switch (!deathAnimSwitch &&!finalswing){
//   case true:
//     if(isPlayerDead()){
//       loopIndexIsEndFrame() ? { deathAnimSwitch = true; finalSwing = true; } : renderOpponentKillsPlayer();
//     }else{
//       loopIndexIsEndFrame() ? { deathAnimSwitch = true; finalSwing = true; } : renderPlayerKillsOpponent();
//     }
//     break;
//   case false:
//     if(isPlayerDead()){
//       renderOpponentIdle();
//       renderPlayerDeathFrame();
//     }else{
//       renderPlayerIdle();
//       renderOpponentDeathFrame(); 
//     }
//     break;
// }