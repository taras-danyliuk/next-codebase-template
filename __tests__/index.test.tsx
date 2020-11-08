import { render, screen } from "@testing-library/react";
import Home from "../pages/index";

describe("Index", () => {
  it("renders without crashing", () => {
    render(<Home />);
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});
