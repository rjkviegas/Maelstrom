import React from "react";
import Gold from "./gold";
import { render } from "@testing-library/react"
import PlayerContext from "../../config/playerContext";

const player = { name: "Ilja MoneyBags", money: -8000 };
const goldRender = (
            <PlayerContext.Provider value={{player}}>
                <Gold />
            </PlayerContext.Provider>
        )

describe("Gold", function() {
    it("renders div element", function() {
        const { getByTestId } = render(goldRender);
        expect(getByTestId("money")).toBeTruthy();
    })
    it("renders image", function () {
        const { getByTestId } = render(goldRender);
        expect(getByTestId("coin")).toHaveAttribute("src");
    })
    it("renders total money", function() {
        const { getByTestId } = render(goldRender);
        expect(getByTestId("money")).toHaveTextContent(-8000);
    })
})