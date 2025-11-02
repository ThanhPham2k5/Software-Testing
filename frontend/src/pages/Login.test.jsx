import { it, describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";

vi.mock("axios");

describe("Test rendering, user interactions, form submission, API calls", () => {
  it("Test rendering component", () => {
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

  it("Test hien thi loi khi submit form rong", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    const formSubmitButton = screen.getByTestId("form-button");
    await user.click(formSubmitButton);

    expect(screen.getByText("username rong")).toBeInTheDocument();
    expect(screen.getByText("password rong")).toBeInTheDocument();

    expect(axios.post).not.toHaveBeenCalled();
  });

  it("Test nut dang nhap khi form hop le", async () => {
    render(
      <MemoryRouter>
        <Login />
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
  it("Test hien thi loi khi API tra ve that bai TH sai tai khoan", async () => {
    const apiError = {
      response: {
        data: {
          isStatus: false,
          message: "Tai khoan khong ton tai",
          token: null,
        },
      },
    };
    axios.post.mockRejectedValue(apiError);

    render(
      <MemoryRouter>
        <Login />
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
      await screen.findByText("Tai khoan khong ton tai")
    ).toBeInTheDocument();
  });

  it("Test hien thi loi khi API tra ve that bai TH sai mat khau", async () => {
    const apiError = {
      response: {
        data: {
          isStatus: false,
          message: "Mat khau khong dung",
          token: null,
        },
      },
    };
    axios.post.mockRejectedValue(apiError);

    render(
      <MemoryRouter>
        <Login />
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

    expect(await screen.findByText("Mat khau khong dung")).toBeInTheDocument();
  });

  it("Test hien thi thong bao khi API tra ve thanh cong", async () => {
    const apiError = {
      response: {
        data: {
          isStatus: false,
          message: "Dang nhap thanh cong",
          token: null,
        },
      },
    };
    axios.post.mockRejectedValue(apiError);

    render(
      <MemoryRouter>
        <Login />
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

    expect(await screen.findByText("Dang nhap thanh cong")).toBeInTheDocument();
  });
});
