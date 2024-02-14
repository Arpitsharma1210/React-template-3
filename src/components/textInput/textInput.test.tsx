import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TextInput from './'; 
import '@testing-library/jest-dom';

describe('Text Input Component', () => {
  it('renders without crashing', () => {
    render(<TextInput />);
    expect(screen.getByRole('textbox').closest('div')).toBeInTheDocument();
  });

  it('renders label through props', () => {
    render(<TextInput label="Email Address" />);
    expect(screen.getByText("Email Address")).toBeInTheDocument();
  });

  it('renders error message through props', () => {
    render(<TextInput error="An error occurred" />);
    expect(screen.getByText("An error occurred")).toBeInTheDocument();
  });

  it('runs onChange function passed through props', () => {
    const mockFunction = jest.fn();
    render(<TextInput onChange={mockFunction} />);
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: "sometext" },
    });
    expect(mockFunction).toHaveBeenCalled();
  });

  it('disables showing error through disableErrorMode prop', () => {
    render(<TextInput error="some error" disableErrorMode />);
    expect(screen.queryByText("some error")).toBeNull();
  });

  it('matches snapshot when given props', () => {
    const { asFragment } = render(
      <TextInput
        label="Email Address"
        error="An error occurred"
        value="example@email.com"
        readOnly
        onReadOnlyCtaClick={() => {}}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
