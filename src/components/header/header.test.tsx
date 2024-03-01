import React from 'react';
import {  fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'; 
import Header from './index';
import { MemoryRouter } from 'react-router-dom';
import styled from 'styled-components';
import {  StyledContainer } from './styles';
import rootReducer from '../../redux/reducers';
import { createMemoryHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';



describe('Header component', () => {

  it('renders with navigation', () => {
    render(
      <Provider store={store}> 
        <MemoryRouter> 
          <Header >
          </Header>
        </MemoryRouter>
      </Provider>
    );

  });


 jest.mock('connected-react-router', () => ({
  ...jest.requireActual('connected-react-router'), 
  goBack: jest.fn() 
}));

const store = createStore(() => ({}));

});

jest.mock('connected-react-router', () => ({
  ...jest.requireActual('connected-react-router'),
  goBack: jest.fn(),
}));

jest.mock('../../hooks', () => ({
  usePopupReducer: () => ({
    visibility: false,
    showPopup: jest.fn(),
    hidePopup: jest.fn(),
  }),
}));

const history = createMemoryHistory();
const middleware = routerMiddleware(history);
const rootReducerWithRouter = combineReducers({
  router: connectRouter(history),
  ...rootReducer,
});
const store = createStore(rootReducerWithRouter, applyMiddleware(middleware));



describe('Styled Components', () => {
  it('renders StyledHeader correctly', () => {
    const wrapper = render(<StyledContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});