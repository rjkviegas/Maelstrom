import React from "react";
import { useOpponent } from "./opponent-hook";

export default function Opponent({ name, hp}) {
  const { opponent } = useOpponent(); 
  return (
    <section>
      <h1>{name}</h1>
      <h2>{hp}</h2>
    </section>
  );
}