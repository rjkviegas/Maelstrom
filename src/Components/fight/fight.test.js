import React from "react";
import ReactDOM from "react-dom";
import Fight from './fight.js'
import OpponentContext from '../../config/opponentContext.js'
import PlayerContext from '../../config/playerContext'
import { render, cleanup, fireEvent } from "@testing-library/react";

const OpponentObj  = { name: "Mouldie Harry", hp: 1};
const PlayerObj = { name: "Righteous Ilja", hp: 10000 };
const fightRender = (
  <PlayerContext.Provider value={{PlayerObj}}>
      <OpponentContext.Provider value={{OpponentObj}}>
          <Fight />,
      </OpponentContext.Provider>
  </PlayerContext.Provider>
  )

let container;
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render( fightRender, container);
});

afterEach(cleanup);

describe("Fight", function() {
    it("fight ends when hp of enemy is less than 0", function() {
        const { getByTestId } = render(<> fightRender </>);
        const attackButton = getByTestId("attack_button");
        fireEvent.click(attackButton);
        expect(getByTestId("h1")).toHaveTextContent("YOU WIN")
        expect(attackButton.style.visibility).toEqual("hidden");
    })
});
