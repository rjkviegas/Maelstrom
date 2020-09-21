import React from "react";
import Gold from "./gold";
import { render } from "@testing-library/react"

const PlayerObj = { name: "Ilja MoneyBags", money: -8000 };
const goldRender = (<Gold PlayerObj={PlayerObj}/>)

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