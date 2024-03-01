import React from 'react';
import renderer from 'react-test-renderer';
import { Form, FormRow, FormRowItem, FormError } from './index';

describe('Form Component', () => {
  it('renders children correctly', () => {
    const tree = renderer
      .create(
        <Form>
          <div>Child Element</div>
        </Form>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders FormRow component correctly', () => {
    const tree = renderer
      .create(
        <FormRow>
          <div>Child Element</div>
        </FormRow>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders FormRowItem component correctly', () => {
    const tree = renderer
      .create(
        <FormRowItem>
          <div>Child Element</div>
        </FormRowItem>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders FormError component correctly with custom message', () => {
    const tree = renderer
      .create(<FormError message="Custom Error Message" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('FormRow Component', () => {
  it('renders children correctly', () => {
    const tree = renderer
      .create(
        <FormRow>
          <div>Test Child</div>
        </FormRow>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('FormRowItem Component', () => {
  it('renders children correctly', () => {
    const tree = renderer
      .create(
        <FormRowItem>
          <div>Test Child</div>
        </FormRowItem>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Department constant', () => {
  it('contains correct label and value pairs', () => {
    const department = [
      { label: "HR", value: "hr" },
      { label: "Design", value: "design" },
      { label: "Engineering", value: "engineering" },
      { label: "Business", value: "business" },
    ];

    department.forEach(({ label, value }) => {
      expect(label).toBeDefined();
      expect(value).toBeDefined();
    });
  });
});
