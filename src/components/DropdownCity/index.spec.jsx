import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { DropdownCity } from "..";

jest.mock("axios");

const mockCities = [
  { matching_full_name: "City1" },
  { matching_full_name: "City2" },
];

axios.get.mockResolvedValue({
  data: {
    _embedded: {
      "city:search-results": mockCities,
    },
  },
});

describe("<Select Cities />", () => {
  test("should show suggestions when typing in the input field", async () => {
    const setValueMock = jest.fn();
    render(
      <DropdownCity
        label="Origem"
        registername="origin"
        setValue={setValueMock}
        errors={{}}
      />,
    );

    const inputField = screen.getByPlaceholderText("Insira a Cidade");
    fireEvent.change(inputField, { target: { value: "City" } });

    await waitFor(() => {
      const suggestion1 = screen.getByText("City1");
      const suggestion2 = screen.getByText("City2");

      expect(suggestion1).toBeInTheDocument();
      expect(suggestion2).toBeInTheDocument();
    });
  });

  test("should select a city from suggestions", async () => {
    const setValueMock = jest.fn();
    render(
      <DropdownCity
        label="Origem"
        registername="origin"
        setValue={setValueMock}
        errors={{}}
      />,
    );

    const inputField = screen.getByPlaceholderText("Insira a Cidade");
    fireEvent.change(inputField, { target: { value: "City" } });

    await waitFor(() => {
      const suggestion1 = screen.getByText("City1");

      fireEvent.click(suggestion1);
      expect(inputField.value).toBe("City1");
      expect(setValueMock).toHaveBeenCalledWith("origin", "City1");
    });
  });

  test("should hide suggestions when clicking outside", async () => {
    const setValueMock = jest.fn();
    render(
      <div>
        <DropdownCity
          label="Origem"
          registername="origin"
          setValue={setValueMock}
          errors={{}}
        />
        <div data-testid="outside">Outside</div>
      </div>,
    );

    const inputField = screen.getByPlaceholderText("Insira a Cidade");

    fireEvent.change(inputField, { target: { value: "City" } });

    await waitFor(() => {
      const suggestion1 = screen.getByText("City1");

      fireEvent.mouseDown(screen.getByTestId("outside"));
      expect(suggestion1).not.toBeInTheDocument();
    });
  });
});
