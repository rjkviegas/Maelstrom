import React from 'react';
import Player from "../player/player";
import Opponent from "../opponent/opponent";
import { usePlayer } from "../player/player-hook";
import { useOpponent } from "../opponent/opponent-hook";

export default function Fight() {
  const { player } = usePlayer();
  const { opponent } = useOpponent();
  return (
    <div>
        Fight component
        Player One:
      {player.map(player => <Player {...player} />)}
        Player Two:
      {opponent.map(opponent => <Opponent {...opponent} />)}
    </div>
  )
}