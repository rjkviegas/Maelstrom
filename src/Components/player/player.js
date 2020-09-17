/* import React from "react";

export default function Player({ name, hp}) {
  return (
    <section>
      <h1>{name}</h1>
      <h2>{hp}</h2>
    </section>
  );
} */
const starting_hitpoints = 100;
const player = {
  name: 'placeholder',
  hp: starting_hitpoints,
  MAX_HP: starting_hitpoints,
}

export default player;