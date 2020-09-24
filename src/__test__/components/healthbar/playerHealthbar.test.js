import React from 'react';
import '../../../Components/healthbar/healthbar.css';
import { render } from "@testing-library/react";
import PlayerHealthBar from '../../../Components/healthbar/playerHealthbar.js'


const playerObj  = { name: "Ilja", hp: 100, MAX_HP: 100 };
const playerHealthbarRender = (<PlayerHealthBar PlayerObj={playerObj}/>)


describe("Player Healthbar", function() {
    it("Player Healthbar rendered", function() {
      const { queryByTestId } = render(playerHealthbarRender)
      expect(queryByTestId("player-health-bar")).toBeTruthy()
    })
    it("health bar rendered with 100% hp", function() {
      const { getByTestId } = render(playerHealthbarRender)
      const element = getByTestId("player-health-bar")
      expect(element.style.width).toEqual('100%');
    })
})
