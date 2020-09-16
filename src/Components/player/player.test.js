import React from "react";
import ReactDOM from "react-dom";
import Player from "./player";

let container;
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

test("title has id", () => {
    ReactDOM.render(<Player />, container);
    expect(container.querySelector("h1")).toHaveAttribute("id", "player-one-name")
});

  test("it can pass name", () => {
        const player = { name: "Ilja", hp: 2000 };
        ReactDOM.render((<Player {...player}/>), container);
          expect(container.querySelector("h1").textContent).toBe("Ilja");
  });

  test("it can pass hp", () => {
    const player = { name: "Ilja", hp: 2000 };
    ReactDOM.render((<Player {...player}/>), container);
      expect(container.querySelector("h2").textContent).toBe("2000");
  });
