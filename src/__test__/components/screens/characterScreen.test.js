import React from "react";
import CharacterScreen from "../../../Components/screens/characterScreen.js";
import PlayerContext from "../../../config/playerContext.js";
import { render } from '@testing-library/react'

const PlayerObj = { money: 100, name: "Harry" }

describe("Character", function() {

    it("character is displayed", function() {
        const { getByTestId } = render(
            <PlayerContext.Provider value={{PlayerObj}}>
                <CharacterScreen />
            </PlayerContext.Provider>
            );
            expect(getByTestId("player_name")).toBeTruthy();
            expect(getByTestId("base_damage")).toBeTruthy();
            expect(getByTestId("strength")).toBeTruthy();
            expect(getByTestId("defence")).toBeTruthy();
    });
});
