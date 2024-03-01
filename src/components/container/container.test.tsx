import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import Container from './index';
import { Provider } from 'react-redux';
import store from '../../redux/store';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/',
  }),
}));

describe('Container component', () => {
  it('renders with default props and correct layout', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <Container />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
