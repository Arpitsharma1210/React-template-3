import React from 'react';
import {
  render, fireEvent, waitFor, screen,
} from '@testing-library/react';
import ModalAction from './index';
import { Provider } from 'react-redux';
import store from '../../redux/store';

describe('ModalAction component', () => {
  it('renders without errors', () => {
    const { container } = render(
    <Provider store={store}>
    <ModalAction />
    </Provider>
    );
    expect(container).toBeTruthy();
  });

  it('handles errors during submission', async () => {
    const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();

    const props = {
      title: 'Test Title',
      info: 'Test Info',
      successCta: 'Submit',
      onCancel: jest.fn(),
      onSuccess: jest.fn().mockRejectedValue(new Error('Submission failed')),
      closePopup: jest.fn(),
    };
    render(
    <Provider store={store}>
    <ModalAction {...props} />
    </Provider>
    );
    const submitButton = screen.getByText(props.successCta);
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(props.successCta)).toBeInTheDocument();
    });

    expect(consoleLogMock).toHaveBeenCalledWith(expect.any(Error));
    consoleLogMock.mockRestore();
  });

});