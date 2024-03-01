import React from 'react';
import { render, fireEvent, screen, within, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import DateInput from './';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { StyledContainer, StyledLabel } from '../textInput/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import moment from 'moment';

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

    it('renders with a disabled state', () => {
      render(
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DateInput disabled />
        </LocalizationProvider>
      );
      const datePicker = screen.getByRole('textbox');
      expect(datePicker).toBeDisabled();
    });

    it('renders the label when provided', () => {
      const labelText = 'Test Label';
      render(
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DateInput label={labelText} />
        </LocalizationProvider>
      );
      const labelElement = screen.getByText(labelText);
      expect(labelElement).toBeInTheDocument();
    });

    it('renders StyledInputText when in read-only mode', () => {
      const value = '2023-04-01';
      render(
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DateInput value={value} readOnly />
        </LocalizationProvider>
      );
      const inputTextElement = screen.getByText(moment(value).format('DD MMMM, YYYY'));
      expect(inputTextElement).toBeInTheDocument();
    });
});
