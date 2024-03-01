import React from 'react';
import { render } from '@testing-library/react';
import PopupError from './'; 

describe('Popup Error Component', () => {
  it('matches snapshot when given props', () => {
    const { asFragment } = render(
      <PopupError
        anchorEl={document.createElement('div')}
        message="An error occurred."
        onClose={() => {}}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
