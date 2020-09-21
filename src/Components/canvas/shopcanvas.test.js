import React from "react";
import ShopCanvas from "./shopCanvas";
import { render } from "@testing-library/react"
import Gold from "../gold/gold";
import ShallowRenderer from 'react-test-renderer/shallow';

describe("Shop canvas", function() {
    it("shopc is displayed", function() {
        const { getByTestId } = render(<ShopCanvas />);
        expect(getByTestId("shop")).toBeTruthy();
    });
    it("renders Gold component", function() {
        const renderer = new ShallowRenderer();
        const result = renderer.render(<ShopCanvas/>);
        expect(result.props.children[0]).toEqual(<Gold/>);
    })

});

