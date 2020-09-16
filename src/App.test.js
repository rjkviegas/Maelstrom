import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux'
import App from './App';


const mockStore = configureStore([]);
 
describe('My Connected React-Redux Component', () => {
  let store;
  let component;
  beforeEach(() => {
    store = mockStore({
      myState: 'sample text',
    });

    component = renderer.create(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
 
  it('should render with given state from Redux store', () => {
 
  });
 
  it('should dispatch an action on button click', () => {
 
  });
});
/* test('renders learn react link', () => {
  const { getByText } = render(<Provider ><App></App></Provider>);
  const linkElement = getByText(/Enter your name/i);
  expect(linkElement).toBeInTheDocument();
}); */
