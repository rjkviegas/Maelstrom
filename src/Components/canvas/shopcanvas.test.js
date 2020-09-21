import React from "react";
import ShopCanvas from "./shopCanvas";
import { render } from "@testing-library/react"
import PlayerContext from "../../config/playerContext";

describe("Shop canvas", function() {
    it("shop is displayed", function() {
        const PlayerObj = { money: 0 }
        const { getByTestId } = render(
            <PlayerContext.Provider value={{PlayerObj}}>
                <ShopCanvas />
            </PlayerContext.Provider>
            );
        expect(getByTestId("shop")).toBeTruthy();
    });
});
