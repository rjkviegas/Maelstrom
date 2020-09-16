import React, { createContext, useState, useContext } from "react";
import playerData from "./player.json";
//console.log(playerData)
const PlayerContext = createContext();
export const usePlayer = () => useContext(PlayerContext);

export function PlayerProvider ({ children }) {
  const [player, setPlayer] = useState(playerData);
  console.log(player);
  return (
    <PlayerContext.Provider value={{ player, setPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};