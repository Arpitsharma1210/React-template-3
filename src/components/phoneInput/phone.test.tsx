import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import PhoneInput from './index';
 
jest.mock('react-phone-input-2/lib/bootstrap.css', () => ({}));

describe('PhoneInput Component', () => {
  it('renders without crashing', () => {
    render(<PhoneInput />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    const labelText = 'Phone Number';
    render(<PhoneInput label={labelText} />);
    expect(screen.getByText(labelText)).toBeInTheDocument();
  });

  it('renders error message when provided', () => {
    const errorMessage = 'Invalid phone number';
    render(<PhoneInput error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

//   it('displays read-only text when in read-only mode', () => {
//     const readOnlyText = '+1  123-456-7890';
//     render(<PhoneInput value={{ phone: readOnlyText }} readOnly />);
//     expect(screen.getByDisplayValue(readOnlyText)).toBeInTheDocument();
//   });

  it('changes phone input value when a new value is entered', () => {
    const onChangeMock = jest.fn();
    render(<PhoneInput onChange={onChangeMock} />);
    const phoneInput = screen.getByRole('textbox');
    fireEvent.change(phoneInput, { target: { value: '+1  123-456-7890' } });
    expect(onChangeMock).toHaveBeenCalledWith({ phone: '11234567890', dialCode: '1' });
  });

//   it('takes up full width when fullWidth prop is true', () => {
//     render(<PhoneInput fullWidth />);
//     const phoneInput = screen.getByRole('textbox');
//     expect(phoneInput).toHaveStyle('max-width:  100%');
//   });

//   it('shows required indicator when required prop is true', () => {
//     render(<PhoneInput required />);
//     const phoneInput = screen.getByRole('textbox');
//     expect(phoneInput).toHaveAttribute('required');
//   });

  it('is disabled when disabled prop is true', () => {
    render(<PhoneInput disabled />);
    const phoneInput = screen.getByRole('textbox');
    expect(phoneInput).toBeDisabled();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<PhoneInput />);
    expect(asFragment()).toMatchSnapshot();
  });
});
