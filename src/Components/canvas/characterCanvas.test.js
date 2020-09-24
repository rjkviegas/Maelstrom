import React from "react";
import CharacterCanvas from "./characterCanvas";
import PlayerContext from "../../config/playerContext";
import { render } from '@testing-library/react'

const PlayerObj = { money: 100 }

describe("Character", function() {

    it("character is displayed", function() {
        const { getByTestId } = render(
            <PlayerContext.Provider value={{PlayerObj}}>
                <CharacterCanvas />
            </PlayerContext.Provider>
            );
            expect(getByTestId("player_name")).toBeTruthy();
            expect(getByTestId("base_damage")).toBeTruthy();
            expect(getByTestId("strength")).toBeTruthy();
            expect(getByTestId("defence")).toBeTruthy();
    });
});
