import { render, screen } from "@testing-library/react";
import Login from "../pages/login";

describe("Login", () => {
  it("renders without crashing", () => {
    render(<Login />);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});
