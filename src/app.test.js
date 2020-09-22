import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import App from './App';
import ShallowRenderer from 'react-test-renderer/shallow';
import Fight from './Components/fight/fight.js'
import FightCanvas from './Components/canvas/FightCanvas.js'
import ReactDOM from "react-dom";
import OpponentContext from './config/opponentContext.js'
import PlayerContext from './config/playerContext.js'
import FightRoundsContext from './config/fightRoundsContext';

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

describe('App', () => {
    it('menu link sends to menu', () => {
        const { getByText } = render(<App />);
        const linkElement = getByText(/Start Game/i);
        fireEvent.click(linkElement, { button: 0});
        expect(linkElement).toHaveTextContent('Menu')
        expect(linkElement).toHaveAttribute('href')
    });
});
describe('App', () => {
    it('play link sends to play', () => {
        const { getByText } = render(<App />);
        const linkElement = getByText(/Menu/i);
        expect(global.window.location.pathname).toEqual('/startgame');
        fireEvent.click(linkElement, { button: 0});
        expect(linkElement).toHaveTextContent('Fight')
        expect(global.window.location.pathname).toEqual('/play');
    });
});
describe('App', () => {
    it('fight link sends to fight', () => {
        const { getByTestId } = render(<App />);
        expect(global.window.location.pathname).toEqual('/play');
        const linkElement = getByTestId('fight');
        fireEvent.click(linkElement, { button: 0});
        expect(global.window.location.pathname).toEqual('/fight');
    });
});




    
