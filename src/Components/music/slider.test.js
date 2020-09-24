import React from 'react'
import App from '../../app.js'
import { render } from "@testing-library/react";

it("shows slider", function() {
  const { getByTestId } = render( <App />
  );
  expect(getByTestId("music_slider")).toBeInTheDocument()
})
