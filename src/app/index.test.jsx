import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("should render heading 1", () => {
    render(<Home />);
    expect(screen.getByText("Faça seu Checkout")).toBeVisible();
    expect(
      screen.getByText("É fácil, é tecnológico, isso é futurismo!"),
    ).toBeVisible();
  });
});
