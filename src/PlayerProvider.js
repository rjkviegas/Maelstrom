import React, { createContext, useState, useContext } from "react";
import playerData from "./player.json";

const PlayerContext = createContext();
export const usePlayers = () => useContext(PlayerContext);

export default function PlayerProvider ({ children }) {
  const [players, setPlayers] = useState(playerData);
  return (
    <PlayerContext.Provider value={{ children }}>
      {children}
    </PlayerContext.Provider>
  );
};
