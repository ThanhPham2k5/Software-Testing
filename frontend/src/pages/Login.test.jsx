import { it, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";

describe("Test rendering va user interactions", () => {
  it("Test rendering", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByText("Back to website")).toBeInTheDocument();
    expect(screen.getByTestId("back-arrow")).toHaveAttribute(
      "src",
      "/arrow-long.svg"
    );
    expect(screen.getByTestId("back-img")).toHaveAttribute(
      "src",
      "/pic-img.svg"
    );

    expect(screen.getByText("Sign in with email")).toBeInTheDocument();
    expect(
      screen.getByText("Where every page begins a journey.")
    ).toBeInTheDocument();
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });
});
