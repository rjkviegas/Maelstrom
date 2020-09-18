import React from "react";
import ReactDOM from "react-dom";
import opponent from "../opponent";
import PlayerContext from '../../../config/opponentContext.js'
import { render, cleanup } from "@testing-library/react";

beforeEach(() => {
    
})
afterEach(cleanup);
let opponent_instance = new opponent();
test('An opponent is instantiated with an alive status', ()=>{
    expect(opponent_instance.isAlive()).toEqual(true)
})