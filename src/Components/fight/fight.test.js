import React from "react";
import ReactDOM from "react-dom";
import Fight from './fight.js'
import OpponentContext from '../../config/opponentContext.js'
import PlayerContext from '../../config/playerContext'
import { render, cleanup, fireEvent } from "@testing-library/react";
import FightRoundsContext from "../../config/fightRoundsContext.js";

const OpponentObj  = { name: "Mouldie Harry", hp: 1};
const PlayerObj = { name: "Righteous Ilja", hp: 10000 };
const FightRounds = { round: 0 };
const dispatch = jest.fn();
const dispatchOpp = jest.fn();
const dispatchFight = jest.fn();

const fightRender = (
  <PlayerContext.Provider value={{PlayerObj, dispatch}}>
      <OpponentContext.Provider value={{OpponentObj, dispatchOpp}}>
          <FightRoundsContext.Provider value={{FightRounds, dispatchFight}}>
            <Fight />
          </FightRoundsContext.Provider>
      </OpponentContext.Provider>
  </PlayerContext.Provider>
  )

// let container;
// beforeEach(() => {
//     container = document.createElement('div');
//     document.body.appendChild(container);
//     ReactDOM.render( fightRender, container);
// });

// afterEach(cleanup);

describe("Fight", function() {
    it("displays attack button", function() {
        const { getByTestId } = render(fightRender);
        expect(getByTestId("attack_button")).toBeTruthy();
        // fireEvent.click(attackButton);
        // expect(getByTestId("h1")).toHaveTextContent("YOU WIN")
        // expect(attackButton.style.visibility).toEqual("hidden");
    })
});
