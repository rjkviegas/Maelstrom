import React, { createContext, useState, useContext } from "react";
import playerData from "./player.json";

const PlayerContext = createContext();
export const usePlayer = () => useContext(PlayerContext);

export function PlayerProvider ({ children }) {
  const [player] = useState(playerData);
  return (
    <PlayerContext.Provider value={{ player }}>
      {children}
    </PlayerContext.Provider>
  );
};