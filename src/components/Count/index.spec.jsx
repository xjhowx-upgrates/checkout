import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("<Count />", () => {
  test("should increment the count value correctly", async () => {
    render(<Home />);
    const button = screen.getByRole("button", { name: /enviar checkout/i });
    const countIncrement = screen.getAllByTitle("Adicionar mais um")[0];
    const inputCount = screen.getAllByRole("spinbutton")[0];

    userEvent.click(countIncrement);
    userEvent.click(button);

    const adultsText = await screen.findByText("1 Adultos");
    expect(adultsText).toBeInTheDocument();

    expect(
      screen.queryByText("Necessário pelo menos um adulto como passageiro."),
    ).not.toBeInTheDocument();

    expect(inputCount).toHaveValue(1);
  });
  test("should show error message when no adults are selected", async () => {
    render(<Home />);
    const button = screen.getByRole("button", { name: /enviar checkout/i });

    userEvent.click(button);

    const errorMessage = await screen.findByText(
      "Necessário pelo menos um adulto como passageiro.",
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
