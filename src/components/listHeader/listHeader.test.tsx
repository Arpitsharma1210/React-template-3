import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ListHeader, { FilterSpec } from './';
import { StyledSearchInput } from './styles';

describe('ListHeader', () => {
  it('renders without crashing', () => {
    render(<ListHeader ctaLabel="Create" />);
    const ctaButton = screen.queryByRole('button', { name: /create/i });
    expect(ctaButton).not.toBeNull();
  });
  

  it('matches snapshot', () => {
    const { asFragment } = render(<ListHeader />);
    expect(asFragment()).toMatchSnapshot();
  });

});
describe('Styled Components', () => {
  it('renders StyledHeader correctly', () => {
    const wrapper = render(<StyledSearchInput />);
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
      disableSearch={false}
      connectFilter={connectFilter}
    />
  );
};

describe('ListHeader', () => {
  it('calls onChange with the entered value when typing into the search input', () => {
    const onChangeMock = jest.fn();

    render(<TestWrapper onSearchChange={onChangeMock} />);
    const searchInput = screen.getByRole('textbox');

    fireEvent.change(searchInput, { target: { value: 'test' } });

    expect(onChangeMock).toHaveBeenCalledWith('test');
  });
});

describe('ListHeader', () => {
  it('renders StyledActionItem components for each filter that passes the renderAction check', () => {
    const filters: FilterSpec[] = [
      {
        id: 'filter1',
        render: () => <span>Filter  1</span>,
        renderAction: () => true,
      },
      {
        id: 'filter3',
        render: () => <span>Filter  3</span>,
      },
    ];

    render(<ListHeader filters={filters} />);

    expect(screen.getByText(/Filter\s*1/)).toBeInTheDocument();
    expect(screen.getByText(/Filter\s*3/)).toBeInTheDocument();
  });
});