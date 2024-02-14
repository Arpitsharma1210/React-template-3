import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import DateInput from './'; // Update the path to your actual component location
import '@testing-library/jest-dom';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { StyledContainer, StyledLabel } from '../textInput/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';

describe('Date Input Component', () => {
    it('renders StyledAvatar correctly', () => {
        const wrapper = render(<StyledContainer />);
        expect(wrapper).toMatchSnapshot();
      });
      it('renders StyledAvatar correctly', () => {
        const wrapper = render(<StyledLabel />);
        expect(wrapper).toMatchSnapshot();
      });

      it('renders without crashing', () => {
        render(
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateInput />
            </LocalizationProvider>
            
        );
    });

});
