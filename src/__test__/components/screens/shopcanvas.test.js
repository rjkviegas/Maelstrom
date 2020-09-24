import React from "react";
import ShopCanvas from "../../../Components/screens/shopCanvas.js";
import PlayerContext from "../../../config/playerContext.js";
import { render } from '@testing-library/react'

const PlayerObj = { money: 100 }

describe("Shop canvas", function() {

    it("shop is displayed", function() {
        const { getByTestId } = render(
            <PlayerContext.Provider value={{PlayerObj}}>
                <ShopCanvas />
            </PlayerContext.Provider>
            );
        expect(getByTestId("shop")).toBeTruthy();
    });

    it("shop has buttons", function() {
        const { getByTestId } = render(
            <PlayerContext.Provider value={{PlayerObj}}>
                <ShopCanvas />
            </PlayerContext.Provider>
            );
        expect(getByTestId("sword-button")).toBeTruthy();
        expect(getByTestId("shield-button")).toBeTruthy();
        expect(getByTestId("back-button")).toBeTruthy();
        expect(getByTestId("healthpot-button")).toBeTruthy();
    });

    it("shop has greeting", function() {
        const { getByTestId } = render(
            <PlayerContext.Provider value={{PlayerObj}}>
                <ShopCanvas />
            </PlayerContext.Provider>
            );
        expect(getByTestId("welcoming")).toHaveTextContent("Welcome to the store");
        expect(getByTestId("welcoming")).toHaveTextContent("What can we get you, maybe a potion");
    });
});
