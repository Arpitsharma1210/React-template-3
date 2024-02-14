import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'; 

import SwitchInput from './index';

const iosSwitch = "iosswitch";

describe('SwitchInput', () => {
    it("renders without crashing", () => {
        render(<SwitchInput  onChange={undefined} />);
      });      
});

describe('SwitchInput', () => {
  it('calls onChange when the switch is toggled and it is not read-only', () => {
    const onChangeMock = jest.fn();
    render(<SwitchInput value={"false"} onChange={onChangeMock} />);

    const switchElement = screen.getByRole('checkbox');
    fireEvent.click(switchElement);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(false);
  });

  it('does not call onChange when the switch is read-only', () => {
    const onChangeMock = jest.fn();
    render(<SwitchInput value={"false"} onChange={onChangeMock} readOnly />);

    const switchElement = screen.getByRole('checkbox');
    fireEvent.click(switchElement);

    expect(onChangeMock).not.toHaveBeenCalled();
  });

  it('calls onReadOnlyCtaClick when the switch is read-only and clicked', () => {
    const onReadOnlyCtaClickMock = jest.fn();
    render(<SwitchInput value={"false"} onReadOnlyCtaClick={onReadOnlyCtaClickMock} readOnly />);

    const switchElement = screen.getByRole('checkbox');
    fireEvent.click(switchElement);

    expect(onReadOnlyCtaClickMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onReadOnlyCtaClick when the switch is not read-only', () => {
    const onReadOnlyCtaClickMock = jest.fn();
    render(<SwitchInput value={"false"} onReadOnlyCtaClick={onReadOnlyCtaClickMock} />);

    const switchElement = screen.getByRole('checkbox');
    fireEvent.click(switchElement);

    expect(onReadOnlyCtaClickMock).not.toHaveBeenCalled();
  });
});