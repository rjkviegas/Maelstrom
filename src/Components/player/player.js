import React from "react";
import { usePlayer } from "./player-hook";

export default function Player({ name, hp}) {
  const { player } = usePlayer(); 
  return (
    <section>
      <h1>{name}</h1>
      <h2>{hp}</h2>
    </section>
  );
}