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

describe("Fight", function() {
    it("displays attack button", function() {
        const { getByTestId } = render(
            <PlayerContext.Provider value={{PlayerObj, dispatch}}>
                <OpponentContext.Provider value={{OpponentObj, dispatchOpp}}>
                    <FightRoundsContext.Provider value={{FightRounds, dispatchFight}}>
                    <Fight />
                    </FightRoundsContext.Provider>
                </OpponentContext.Provider>
            </PlayerContext.Provider>
        );
        expect(getByTestId("attack_button")).toBeTruthy();
    })
    it("shows win when opponent hp 0", function() {
        const OpponentObj = { hp: 0 };
        const { getByTestId } = render(
            <PlayerContext.Provider value={{PlayerObj, dispatch}}>
                <OpponentContext.Provider value={{OpponentObj, dispatchOpp}}>
                    <FightRoundsContext.Provider value={{FightRounds, dispatchFight}}>
                    <Fight />
                    </FightRoundsContext.Provider>
                </OpponentContext.Provider>
            </PlayerContext.Provider>
        );
        expect(getByTestId("h1")).toHaveTextContent("YOU WIN")
    });
    it("shows win when opponent hp 0", function() {
        const PlayerObj = { hp: 0 };
        const { getByTestId } = render(
            <PlayerContext.Provider value={{PlayerObj, dispatch}}>
                <OpponentContext.Provider value={{OpponentObj, dispatchOpp}}>
                    <FightRoundsContext.Provider value={{FightRounds, dispatchFight}}>
                    <Fight />
                    </FightRoundsContext.Provider>
                </OpponentContext.Provider>
            </PlayerContext.Provider>
        );
        expect(getByTestId("h1")).toHaveTextContent("YOU LOSE")
    })
});
