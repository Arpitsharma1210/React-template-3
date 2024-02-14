import React from "react";
import { render, } from "@testing-library/react";
import Card from "./index";
import { StyledCard, StyledCardContent } from "./styles";

describe("Card", () => {
  it("renders without crashing", () => {
    render(<Card children={[]}/>);
    expect(<Card children={[]}/>).toMatchSnapshot();
  });
});

  describe('Styled Components', () => {
    it('renders StyledHeader correctly', () => {
      const wrapper = render(<StyledCard />);
      expect(wrapper).toMatchSnapshot();
    });
    it('renders StyledHeader correctly', () => {
      const wrapper = render(<StyledCardContent  />);
      expect(wrapper).toMatchSnapshot();
    });
  });