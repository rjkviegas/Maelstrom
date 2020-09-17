import React, { useContext } from "react";
import OpponentContext from '../../config/opponentContext.js';



export function Opponent() {
  const { OpponentObj }  = useContext(OpponentContext)
  return (
    <div>
      <div data-testid="opponent_name" id="opponent_name">{ OpponentObj.name }</div>
      <div data-testid="opponent_hp" id="opponent_hp"> {OpponentObj.hp}</div>
    </div>
  );
};