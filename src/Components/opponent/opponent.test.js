import React from "react";
import ReactDOM from "react-dom";
import Opponent from "./opponent";

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
    ReactDOM.render(<Opponent />, container);
    expect(container.querySelector("h1")).toHaveAttribute("id", "opponent-id")
});

  test("it can pass name", () => {
        const opponent = { name: "Ryan", hp: 2000 };
        ReactDOM.render((<Opponent {...opponent}/>), container);
          expect(container.querySelector("h1").textContent).toBe("Ryan");
  });

  test("it can pass hp", () => {
    const opponent = { name: "Ryan", hp: 2000 };
    ReactDOM.render((<Opponent {...opponent}/>), container);
      expect(container.querySelector("h2").textContent).toBe("2000");
  });
