import React from "react";
import ReactDOM from "react-dom";
import { Player } from "../player";
import PlayerContext from '../../../config/playerContext.js'
import { render, cleanup } from "@testing-library/react";

const PlayerObj  = { name: "Ilja", hp: 100};
const playerRender = (
<PlayerContext.Provider value={{PlayerObj}}>
  <Player />,
</PlayerContext.Provider> )

let container;
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render( playerRender, container);
});

afterEach(cleanup);

test("name and hp fields exist", () => {
  const { getByTestId } = render(<> playerRender </>)
  expect(getByTestId("player_name")).toHaveTextContent("Ilja")
  expect(getByTestId("player_hp")).toHaveTextContent("100");

});

test("player_name id contains the player's name", () => {
    expect(document.getElementById('player_name').textContent).toContain('Ilja');
});


test("it can pass hp", () => {
  expect(container.querySelector("div").textContent).toContain('100')
});
