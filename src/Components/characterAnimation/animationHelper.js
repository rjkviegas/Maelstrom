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
//     if(isDead(PlayerObj)){
//       loopIndexIsEndFrame() ? { deathAnimSwitch = true; finalSwing = true; } : renderOpponentKillsPlayer();
//     }else{
//       loopIndexIsEndFrame() ? { deathAnimSwitch = true; finalSwing = true; } : renderPlayerKillsOpponent();
//     }
//     break;
//   case false:
//     if(isDead(OpponentObj)){
//       renderOpponentIdle();
//       renderPlayerDeathFrame();
//     }else{
//       renderPlayerIdle();
//       renderOpponentDeathFrame(); 
//     }
//     break;
// }