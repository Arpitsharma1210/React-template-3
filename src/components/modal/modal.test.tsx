import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import Modal from './'; 
import { StyledHeading, StyledHeadingImgContainer } from './styles';

describe('Modal component', () => {
   
  it('renders with fit-content width', () => {
    render(
      <Modal show={true} fitContent={true}>
        <div>Modal content goes here</div>
      </Modal>
    );
  });
  it('renders StyledHeader correctly', () => {
    const wrapper = render(<StyledHeadingImgContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});
