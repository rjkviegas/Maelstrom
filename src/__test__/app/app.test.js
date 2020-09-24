import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import App from '../../App.js';
import ShallowRenderer from 'react-test-renderer/shallow';


global.window = { location: { pathname: null } };

describe('App', () => {
    it('it exists', () => {
      const app = render(<App />)
      expect(app).toBeTruthy();
          });
      });

afterEach(cleanup);

describe('App', () => {
it('shows menu link', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/Start Game/i);
    expect(linkElement).toBeInTheDocument();
  });
});

describe('App', () => {
    it('play game link presented', () => {       
        const renderer = new ShallowRenderer();
        renderer.render(<App/>);
        const result = renderer.getRenderOutput();
        expect(result.type).toBe('div');
        expect(result.props.children.type).toBe('header')
        });
    });

/* describe('App', () => {
    it('menu link sends to menu', () => {
        const { getByTestId } = render(<App />);
        const linkElement = getByTestId('submit_name');
        const setNameButtonSubmission = getByTestId('submit_name')
        fireEvent.click(setNameButtonSubmission, { button: 0})
        expect(linkElement).toHaveTextContent('Start Game')
        expect(linkElement).toHaveAttribute('href')
    });
}); */
/* describe('App', () => {
    it('play link sends to play', () => {
        const { getByText } = render(<App />);
        const linkElement = getByText(/Start Game/i);
        fireEvent.click(linkElement, { button: 0 })
        expect(global.window.location.pathname).toEqual('/startgame');
        fireEvent.click(linkElement, { button: 0 });
        expect(linkElement).toHaveTextContent('Fight')
        expect(global.window.location.pathname).toEqual('/play');
    });
}); */
/* describe('App', () => {
    it('fight link sends to fight', () => {
        const { getByTestId, getByText } = render(<App />);
        expect(global.window.location.pathname).toEqual('/');
        const getStartGame = getByText(/Start Game/i);
        fireEvent.click(getStartGame, { button: 0 })
        const setNameButtonSubmission = getByTestId(/Submit name/i)
        fireEvent.click(setNameButtonSubmission, { button: 0})
        const linkElement = getByTestId('fight');
        fireEvent.click(linkElement, { button: 0});
        expect(global.window.location.pathname).toEqual('/fight');
    });
}); */




    
