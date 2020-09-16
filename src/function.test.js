import React from "react";
import ReactDOM from "react-dom";
import Player from "./components/player/player";

test("renders a player", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Player />, div);
  expect(div.querySelector("h1")).toBeTruthy();
});


test("nothing in h4", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Player />, div);
    expect(div.querySelector("section")).toBeTruthy();
});
