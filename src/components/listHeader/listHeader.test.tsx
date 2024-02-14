import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ListHeader from './';
import { StyledSearchInput, StyledActionItem } from './styles';

describe('ListHeader', () => {
  it('renders without crashing', () => {
    render(<ListHeader heading="" ctaLabel="Create" />);
    const ctaButton = screen.queryByRole('button', { name: /create/i });
    expect(ctaButton).not.toBeNull();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<ListHeader heading=""/>);
    expect(asFragment()).toMatchSnapshot();
  });

});
describe('Styled Components', () => {
  it('renders StyledHeader correctly', () => {
    const wrapper = render(<StyledSearchInput />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders StyledHeader correctly', () => {
    const wrapper = render(<StyledActionItem />);
    expect(wrapper).toMatchSnapshot();
  });
});

type OnSearchChangeType = (value: string) => void;

const TestWrapper: React.FC<{ onSearchChange: OnSearchChangeType }> = ({ onSearchChange }) => {
  const connectFilter = (key: string, options: Record<string, unknown>) => (Component: React.ComponentType<any>) => {
    return <Component onChange={onSearchChange} {...options} />;
  };

  return (
    <ListHeader
    heading=""
      disableSearch={false}
      connectFilter={connectFilter}
    />
  );
};

it('matches snapshot', () => {
  const { asFragment } = render(<ListHeader heading="" />);
  expect(asFragment()).toMatchSnapshot();
});

