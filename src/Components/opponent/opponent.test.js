import React from "react";
import ReactDOM from "react-dom";
import { Opponent } from "./opponent";
import OpponentContext from '../../config/opponentContext.js'
import { render, cleanup } from "@testing-library/react";

const OpponentObj  = { name: "Ilja", hp: 100};
const opponentRender = (
<OpponentContext.Provider value={{OpponentObj}}>
  <Opponent />,
</OpponentContext.Provider> )

let container;
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render( opponentRender, container);
});

afterEach(cleanup);

describe("Opponent Component", function() {
  it("name and hp fields exist", function() {
    const { getByTestId } = render(<> opponentRender </>)
    expect(getByTestId("opponent_name")).toHaveTextContent("Ilja")
    expect(getByTestId("opponent_hp")).toHaveTextContent("100"); 
  })
});

describe("Opponent Component", function() {
  it("opponent_name id contains the opponent's name", function() {
    expect(document.getElementById('opponent_name').textContent).toContain('Ilja');
  })
});

describe("Opponent Component", function() {
  it("it can pass hp", function() {
    expect(container.querySelector("div").textContent).toContain('100');
  })
});
