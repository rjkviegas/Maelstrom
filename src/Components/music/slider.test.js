import React from 'react'
import Fight from '../fight/fight.js'
import App from '../../app.js'
import InputSlider,{ handleSliderChange } from './slider.js'
import { render, fireEvent} from "@testing-library/react";

it("shows slider", function() {
  const { getByTestId } = render( <App />
  );
  expect(getByTestId("music_slider")).toBeInTheDocument()
})
