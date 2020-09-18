import React from 'react';
import ReactDOM from "react-dom";
import './healthbar.css';
import { OpponentHealthBar } from './enemyHealthbar'
import OpponentContext from '../../config/opponentContext';
import { render, cleanup } from "@testing-library/react";


const OpponentObj  = { name: "Ilja", hp: 100};
const opponentHealthbarRender = (
                      <OpponentContext.Provider value={{OpponentObj}}>
                        <OpponentHealthBar />,
                      </OpponentContext.Provider> 
                      )



afterEach(cleanup);

describe("Opponent Healthbar", function() {
    it("Opponent Healthbar renders with 100% width", function() {
        const { getByTestId } = render(opponentHealthbarRender)
        const test = getByTestId("health-bar-fluid")
    })
})