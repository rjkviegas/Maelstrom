import React from 'react';
import Menu from './menu';
import Rename from '../rename/rename.js'
import Fight from '../fight/fight.js'
import ShallowRenderer from 'react-test-renderer/shallow';
import { render } from '@testing-library/react';

test('menu link click displays menu', () => {
    
    const renderer = new ShallowRenderer();
    renderer.render(<Menu />);
    const result = renderer.getRenderOutput();
    expect(result.type).toBe('div');
    expect(result.props.children).toEqual([
        <Rename/>,
        <Fight/>
    ]) 
})




