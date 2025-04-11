import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { DatePicker } from "..";
import Home from "@/app/page";

describe("<DatePicker />", () => {
  test("should render date inputs correctly", () => {
    render(
      <DatePicker datei={{}} datef={{}} setValue={() => {}} errors={{}} />,
    );
    const fromDateInput = screen.getAllByPlaceholderText("DD/MM/YYYY")[0];
    const toDateInput = screen.getAllByPlaceholderText("DD/MM/YYYY")[1];
    expect(fromDateInput).toBeInTheDocument();
    expect(toDateInput).toBeInTheDocument();
  });

  test("should show date picker when clicking on date inputs", () => {
    render(
      <DatePicker datei={{}} datef={{}} setValue={() => {}} errors={{}} />,
    );

    const fromDateInput = screen.getAllByPlaceholderText("DD/MM/YYYY")[0];
    fireEvent.focus(fromDateInput);

    const datePicker = screen.getByTestId("daypicker");
    expect(datePicker).toBeInTheDocument();
  });
  test("should set selected date range when selecting dates from the date picker", () => {
    render(
      <Home />
    );

    const fromDateInput = screen.getAllByPlaceholderText("DD/MM/YYYY")[0];
    fireEvent.focus(fromDateInput);
    const fromDate = screen.getByRole("gridcell", { name: "5" });
    fireEvent.click(fromDate);

    const toDateInput = screen.getAllByPlaceholderText("DD/MM/YYYY")[1];
    fireEvent.focus(toDateInput);
    const toDate = screen.getByRole("gridcell", { name: "21" });
    fireEvent.click(toDate);

    expect(fromDateInput.value).toBe("21/07/2023");
    expect(toDateInput.value).toBe("05/08/2023");
  });

  test("should hide date picker when clicking outside", async () => {
    render(
      <div>
        <DatePicker datei={{}} datef={{}} setValue={jest.fn()} errors={{}} />
        <div data-testid="outside">Outside</div>
      </div>,
    );

    const fromDateInput = screen.getAllByPlaceholderText("DD/MM/YYYY")[0];
    fireEvent.focus(fromDateInput);

    expect(screen.getByTestId("daypicker")).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByTestId("outside"));

    await waitFor(() => {
      expect(screen.queryByTestId("daypicker")).not.toBeInTheDocument();
    });
  });
});
