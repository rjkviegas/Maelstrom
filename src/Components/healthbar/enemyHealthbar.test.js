import React from 'react';
import './healthbar.css';
import OpponentHealthBar from './enemyHealthbar'
import { render } from "@testing-library/react";


const OpponentObj  = { name: "Ilja", hp: 100, MAX_HP: 100 };
const opponentHealthbarRender = (<OpponentHealthBar OpponentObj={OpponentObj}/>)

describe("Opponent Healthbar", function() {
    it("Opponent Healthbar renders with 100% width", function() {
      const { getByTestId } = render(opponentHealthbarRender)
      const element = getByTestId("opponent-health-bar")
      expect(element.style.width).toEqual('100%');
    })
})
