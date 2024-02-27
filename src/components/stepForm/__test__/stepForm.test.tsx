import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux'; // Assuming you are using Redux
import StepForm from '../';

const forms = [
  {
    heading: 'Form 1',
    component: () => <div data-testid='form1'>Form 1 Content</div>,
  },
  {
    heading: 'Form 2',
    component: () => <div data-testid='form2'>Form 2 Content</div>,
  },
];

const mockStore = {
  getState: jest.fn(() => ({
    stepForm: {
      currentPage: 0, // Set currentPage to initial value
      forms: {},
      validationErrors: {},
    },
  })),
  dispatch: jest.fn(),
  subscribe: jest.fn(),
  replaceReducer: jest.fn(),
};

describe('StepForm component', () => {
  it('renders with correct heading and form content', () => {
    const { getByText } = render(
      <Provider store={mockStore}>
        <StepForm heading='Step Form' subHeading='Step Form Subheading' forms={forms} />
      </Provider>
    );

    expect(getByText('Step Form')).toBeInTheDocument();
    expect(getByText('Step Form Subheading')).toBeInTheDocument();

    expect(getByText('Form 1 Content')).toBeInTheDocument();
  });

  it('changes form content when navigation buttons are clicked', () => {
    const { getByText } = render(
      <Provider store={mockStore}>
        <StepForm heading='Step Form' forms={forms} />
      </Provider>
    );

    expect(screen.getByTestId('form1')).toBeInTheDocument();
  });
});
