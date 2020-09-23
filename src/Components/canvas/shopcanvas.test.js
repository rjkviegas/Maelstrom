import React from "react";
import ShopCanvas from "./shopCanvas";
import PlayerContext from "../../config/playerContext";
import { render, fireEvent } from '@testing-library/react'

const PlayerObj = { money: 0 }

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
    });

    // it("shop has a back button which returns to main menu", function() {
    //     const addStrength = jest.fn()
    //     const { getByTestId } = render(
    //         <PlayerContext.Provider value={{PlayerObj}}>
    //             <ShopCanvas addStrength = { addStrength }/> 
    //         </PlayerContext.Provider>
    //         ); 
    //     fireEvent.click(getByTestId("sword-button"))
    //     expect(addStrength).toHaveBeenCalled();
    // })

});
