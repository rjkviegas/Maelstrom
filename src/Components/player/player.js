import React from "react";

export default function Player({ name, hp}) {
  return (
    <section>
      <h1>{name}</h1>
      <h2>{hp}</h2>
    </section>
  );
}