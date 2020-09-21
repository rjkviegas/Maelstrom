import React from "react";
import ShopCanvas from "./shopCanvas";
import ShallowRenderer from 'react-test-renderer/shallow';
import Gold from "../gold/gold";

describe("Shop canvas", function() {
    it("shop is displayed", function() {
        const renderer = new ShallowRenderer();
        renderer.render(<ShopCanvas />);
        const result = renderer.getRenderOutput();
        expect(result.props.children).toEqual([<Gold />, <canvas data-testid="shop" id="shop" />]) 
    });
});
