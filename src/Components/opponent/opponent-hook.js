import React, { createContext, useState, useContext } from "react";
import opponentData from "./opponent.json";
//console.log(playerData)
const OpponentContext = createContext();
export const useOpponent = () => useContext(OpponentContext);

export function OpponentProvider ({ children }) {
  const [opponent, setOpponent] = useState(opponentData);
  return (
    <OpponentContext.Provider value={{ opponent, setOpponent }}>
      {children}
    </OpponentContext.Provider>
  );
};