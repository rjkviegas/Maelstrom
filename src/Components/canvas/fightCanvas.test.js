import React from "react";
import ReactDOM from "react-dom";
import FightCanvas from './FightCanvas.js'
import OpponentContext from '../../config/opponentContext.js'
import PlayerContext from '../../config/playerContext'
import { cleanup } from "@testing-library/react";

const OpponentObj  = { name: "Mouldie Harry", hp: 1};
const PlayerObj = { name: "Righteous Ilja", hp: 10000 };
const fightCanvasRender = (
    <PlayerContext.Provider value={{PlayerObj}}>
        <OpponentContext.Provider value={{OpponentObj}}>
            <FightCanvas />,
        </OpponentContext.Provider>
    </PlayerContext.Provider>
    )

let container;
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render( fightCanvasRender, container);
});

afterEach(cleanup);

describe("FightCanvas", function () {
    it("canvas is rendered", function () {
        expect(container.querySelector("canvas")).toBeTruthy();
    })
});
