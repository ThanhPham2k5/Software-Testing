import { it, describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";

vi.mock("axios");

describe("Test rendering, user interactions, form submission, API calls", () => {
  const mockSetToken = vi.fn();

  it("Test rendering component", () => {
    render(
      <MemoryRouter>
        <Login setToken={mockSetToken} />
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

  it("Test hien thi loi khi submit form rong", async () => {
    render(
      <MemoryRouter>
        <Login setToken={mockSetToken} />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    const formSubmitButton = screen.getByTestId("form-button");
    await user.click(formSubmitButton);

    expect(screen.getByText("Username cannot be empty.")).toBeInTheDocument();
    expect(screen.getByText("Password cannot be empty.")).toBeInTheDocument();

    expect(axios.post).not.toHaveBeenCalled();
  });

  it("Test nut dang nhap khi form hop le", async () => {
    render(
      <MemoryRouter>
        <Login setToken={mockSetToken} />
      </MemoryRouter>
    );
    const user = userEvent.setup();

    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");
    const formSubmitButton = screen.getByTestId("form-button");

    await user.type(usernameInput, "testUser");
    await user.type(passwordInput, "testPass123");

    await user.click(formSubmitButton);

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:8080/api/auth/login",
      {
        username: "testUser",
        password: "testPass123",
      }
    );
  });
});

describe("Test error handling va success message", () => {
  const mockSetToken = vi.fn();
  it("Test hien thi loi khi API tra ve that bai TH sai tai khoan", async () => {
    const apiError = {
      response: {
        data: {
          isStatus: false,
          message: "Username is incorrect",
          token: null,
        },
      },
    };
    axios.post.mockRejectedValue(apiError);

    render(
      <MemoryRouter>
        <Login setToken={mockSetToken} />
      </MemoryRouter>
    );
    const user = userEvent.setup();

    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");
    const formSubmitButton = screen.getByTestId("form-button");

    await user.type(usernameInput, "admin");
    await user.type(passwordInput, "admin123");

    await user.click(formSubmitButton);

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:8080/api/auth/login",
      {
        username: "admin",
        password: "admin123",
      }
    );

    expect(
      await screen.findByText("Username is incorrect")
    ).toBeInTheDocument();
  });

  it("Test hien thi loi khi API tra ve that bai TH sai mat khau", async () => {
    const mockSetToken = vi.fn();

    const apiError = {
      response: {
        data: {
          isStatus: false,
          message: "Password is incorrect",
          token: null,
        },
      },
    };
    axios.post.mockRejectedValue(apiError);

    render(
      <MemoryRouter>
        <Login setToken={mockSetToken} />
      </MemoryRouter>
    );
    const user = userEvent.setup();

    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");
    const formSubmitButton = screen.getByTestId("form-button");

    await user.type(usernameInput, "admin");
    await user.type(passwordInput, "wrongpass");

    await user.click(formSubmitButton);
    const errorMsg = await screen.findByTestId("password-test");

    expect(errorMsg).toBeInTheDocument();
    expect(errorMsg).toHaveTextContent("Password must have numbers.");
  });

  it("Test hien thi thong bao khi API tra ve thanh cong", async () => {
    const apiSuccess = {
      response: {
        data: {
          isStatus: true,
          message: "Login successful",
          token: "token123",
        },
      },
    };
    axios.post.mockResolvedValue(apiSuccess);

    render(
      <MemoryRouter>
        <Login setToken={mockSetToken} />
      </MemoryRouter>
    );
    const user = userEvent.setup();

    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");
    const formSubmitButton = screen.getByTestId("form-button");

    await user.type(usernameInput, "admin");
    await user.type(passwordInput, "admin123");

    await user.click(formSubmitButton);

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:8080/api/auth/login",
      {
        username: "admin",
        password: "admin123",
      }
    );

    expect(screen.getByTestId("username-test").textContent).toBe("");
  });
});
