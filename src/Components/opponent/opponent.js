import React from "react";

export default function Opponent({ name, hp}) {
  return (
    <section>
      <h1 id="opponent-id">{name}</h1>
      <h2>{hp}</h2>
    </section>
  );
}