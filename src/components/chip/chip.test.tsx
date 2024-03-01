import React from 'react';
import Chip from './chip';
import ChipGroup from './chipGroup';
import renderer from 'react-test-renderer';
import { StyledChipContainer, StyledChipShowMoreContainer, StyledPopoverChipGroup, StyledPopoverContainer, StyledPopoverSectionContainer, StyledPopoverSectionHeader, StyledPopoverWrapper } from './styles';


describe('Chip Component', () => {
  it('renders chip with text correctly', () => {
    const tree = renderer
      .create(<Chip text="Test Chip" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders chip with icon when iconCtaClick prop is provided', () => {
    const tree = renderer
      .create(<Chip text="Test Chip" iconCtaClick={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('ChipGroup Component', () => {
  it("renders all chips when displayCount prop is not provided", () => {
    const data = [{ header: 'Group  1', data: [{ key: '1', text: 'Chip  1', bgColor: 'red', textColor: 'white' }] }];
    const tree = renderer
      .create(<ChipGroup data={data} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders only specified number of chips when displayCount prop is provided', () => {
    const data = [{ header: 'Group  1', data: [{ key: '1', text: 'Chip  1', bgColor: 'red', textColor: 'white' }] }];
    const tree = renderer
      .create(<ChipGroup data={data} displayCount={1} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders chip popover when more chips are available', () => {
    const data = [
      { header: 'Group  1', data: [{ key: '1', text: 'Chip  1', bgColor: 'red', textColor: 'white' }] },
      { header: 'Group  2', data: [{ key: '2', text: 'Chip  2', bgColor: 'blue', textColor: 'white' }] }
    ];
    const tree = renderer
      .create(<ChipGroup data={data} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Styled Components', () => {
  it('renders StyledChipContainer correctly', () => {
    const tree = renderer
      .create(<StyledChipContainer bgColor="red" textColor="white" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });  

  it('renders StyledChipShowMoreContainer correctly', () => {
    const tree = renderer
      .create(<StyledChipShowMoreContainer>Show More</StyledChipShowMoreContainer>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders StyledPopoverWrapper correctly', () => {
    const tree = renderer
      .create(<StyledPopoverWrapper>Popover Content</StyledPopoverWrapper>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders StyledPopoverContainer correctly', () => {
    const tree = renderer
      .create(<StyledPopoverContainer>Popover Container</StyledPopoverContainer>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders StyledPopoverSectionContainer correctly', () => {
    const tree = renderer
      .create(<StyledPopoverSectionContainer>Section Content</StyledPopoverSectionContainer>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders StyledPopoverSectionHeader correctly', () => {
    const tree = renderer
      .create(<StyledPopoverSectionHeader>Section Header</StyledPopoverSectionHeader>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders StyledPopoverChipGroup correctly', () => {
    const tree = renderer
      .create(<StyledPopoverChipGroup>Chip Group</StyledPopoverChipGroup>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});