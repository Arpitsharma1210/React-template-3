import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CheckBoxInput from './';
import '@testing-library/jest-dom';

describe('CheckBox Input Component', () => {
  it('renders without crashing', () => {
    render(<CheckBoxInput />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('renders label through props', () => {
    render(<CheckBoxInput label="I agree to terms" />);
    expect(screen.getByLabelText("I agree to terms")).toBeInTheDocument();
  });

  it('renders error message through props', () => {
    render(<CheckBoxInput error="An error occurred" />);
    expect(screen.getByText("An error occurred")).toBeInTheDocument();
  });

  it('runs onChange function passed through props', () => {
    const mockFunction = jest.fn();
    render(<CheckBoxInput onChange={mockFunction} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(mockFunction).toHaveBeenCalled();
  });

  it('disables showing error through disableErrorMode prop', () => {
    render(<CheckBoxInput error="some error" disableErrorMode />);
    expect(screen.queryByText("some error")).toBeNull();
  });

  it('matches snapshot when given props', () => {
    const { asFragment } = render(
      <CheckBoxInput
        label="I agree to terms"
        error="An error occurred"
        value='false'
        fullWidth
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
