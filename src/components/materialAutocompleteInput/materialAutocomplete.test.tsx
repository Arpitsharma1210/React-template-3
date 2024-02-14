import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import MaterialAutocompleteInput from ".";

// test ids
const inputContainer = "input-container";

const options = [
  { id: 1, label: "Option 1" },
  { id: 2, label: "Option 2" },
  { id: 3, label: "Option 3" },
];

describe("MaterialAutoCompleteInput component", () => {
  it("renders without crashing", () => {
    render(<MaterialAutocompleteInput 
        options={[]}
        onChange={() => {}}
       />);
  });

  it("renders tags when multiple is true", () => {
    const { getByText } = render(
      <MaterialAutocompleteInput
        options={options}
        value={[options[0]]}
        multiple
      />
    );

    expect(getByText("Option 1")).toBeInTheDocument();
  });

  it("calls onChange when an option is selected", async () => {
    const mockOnChange = jest.fn();
    const { getByLabelText, getByText } = render(
      <MaterialAutocompleteInput options={options} onChange={mockOnChange} />
    );

    fireEvent.click(getByLabelText("Open"));

    await waitFor(() => getByText("Option 1"));

    fireEvent.click(getByText("Option 1"));

    expect(mockOnChange).toHaveBeenCalledWith(options[0]);
  });

  describe('MaterialAutocompleteInput', () => {
    it('calls searchOptions on input change', async () => {
      const mockSearchOptions = jest.fn();
      const options = [{ id: '1', label: 'Option  1' }, { id: '2', label: 'Option  2' }];
  
      render(
        <MaterialAutocompleteInput
          options={options}
          searchOptions={mockSearchOptions}
        />
      );
      const inputField = screen.getByRole('combobox');
      fireEvent.change(inputField, { target: { value: 'searchValue' } });
      await waitFor(() =>
        expect(mockSearchOptions).toHaveBeenCalledWith('searchValue')
      );
    });
  });
});