import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Confirmation } from "..";

describe("<Confirmation Message />", () => {
  test("should render confirmation modal", () => {
    const setShowModal = jest.fn();
    render(<Confirmation setShowModal={setShowModal} />);

    expect(screen.getByText("Checkout efetuado com sucesso!")).toBeVisible();
    expect(screen.getByRole("button", { name: "X" })).toBeVisible();
  });

  test("should close modal on button click and reload the page", () => {
    const setShowModal = jest.fn();
    render(<Confirmation setShowModal={setShowModal} />);

    delete window.location;
    window.location = { reload: jest.fn() };

    const closeButton = screen.getByRole("button", { name: "X" });
    fireEvent.click(closeButton);

    expect(setShowModal).toHaveBeenCalledWith(false);
    expect(window.location.reload).toHaveBeenCalled();
  });
});
