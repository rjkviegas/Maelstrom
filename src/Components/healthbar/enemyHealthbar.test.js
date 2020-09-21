import React from 'react';
import ReactDOM from "react-dom";
import './healthbar.css';
import { OpponentHealthBar } from './enemyHealthbar'
import OpponentContext from '../../config/opponentContext';
import { render, cleanup } from "@testing-library/react";


const OpponentObj  = { name: "Ilja", hp: 100, MAX_HP: 100 };
const opponentHealthbarRender = (
                      <OpponentContext.Provider value={{OpponentObj}}>
                        <OpponentHealthBar />,
                      </OpponentContext.Provider> 
                      )



describe("Opponent Healthbar", function() {
    it("Opponent Healthbar renders with 100% width", function() {
      const { getByTestId } = render(opponentHealthbarRender)
      const element = getByTestId("health-bar-fluid")
      expect(element.style.width).toEqual('100%');
    })
})