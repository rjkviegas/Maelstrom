import React from "react";

export default function Player({ name, hp}) {
  return (
    <section>
      <h1 id="player-one-name">{name}</h1>
      <h2>{hp}</h2>
    </section>
  );
}