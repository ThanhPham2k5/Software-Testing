import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import CreateBook from "./CreateBook";
import { validateProduct } from "../utils/validateProduct/validateProduct";

vi.mock("axios");
vi.mock("../utils/validateProduct/validateProduct", () => ({
  validateProduct: vi.fn(() => ({})),
}));

describe("Test CreateBook component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.alert = vi.fn();
  });

  it("Test render", () => {
    const checkCreate = vi.fn();
    const onAdd = vi.fn();
    render(<CreateBook checkCreate={checkCreate} onAdd={onAdd} />);

    expect(screen.getByText("Add New Book")).toBeInTheDocument();
    expect(screen.getByText("Return")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
    expect(screen.getByText("Name book:")).toBeInTheDocument();
    expect(screen.getByTestId("input-name")).toBeInTheDocument();
    expect(screen.getByText("Price:")).toBeInTheDocument();
    expect(screen.getByTestId("input-price")).toBeInTheDocument();
    expect(screen.getByText("Category:")).toBeInTheDocument();
    expect(screen.getByTestId("select-category")).toBeInTheDocument();
    expect(screen.getByText("Quantity:")).toBeInTheDocument();
    expect(screen.getByTestId("input-quantity")).toBeInTheDocument();
    expect(screen.getByText("Description:")).toBeInTheDocument();
    expect(screen.getByTestId("input-description")).toBeInTheDocument();
    expect(screen.getByText("Upload Image")).toBeInTheDocument();
    expect(screen.getByTestId("picture-box")).toBeInTheDocument();
    expect(screen.getByTestId("image-input")).toBeInTheDocument();
  });
  it("Test return button", async () => {
    const checkCreate = vi.fn();
    const onAdd = vi.fn();
    render(<CreateBook checkCreate={checkCreate} onAdd={onAdd} />);

    const user = userEvent.setup();
    const returnButton = screen.getByText("Return");
    await user.click(returnButton);

    expect(checkCreate).toHaveBeenCalled();
  });
  it("Test them sach thanh cong", async () => {
    const user = userEvent.setup();
    const checkCreate = vi.fn();
    const onAdd = vi.fn();
    const mockToken = "mock-token-123";
    localStorage.setItem("accessToken", mockToken);

    const mockResponse = {
      data: { id: 101, name: "New Book", price: 50000 },
    };
    axios.post.mockResolvedValue(mockResponse);

    render(<CreateBook checkCreate={checkCreate} onAdd={onAdd} />);

    await user.type(screen.getByTestId("input-name"), "Conan Tap 1");
    await user.type(screen.getByTestId("input-price"), "20000");
    await user.type(screen.getByTestId("input-quantity"), "100");
    await user.type(screen.getByTestId("input-description"), "Manga hay");
    await user.selectOptions(screen.getByTestId("select-category"), "MANGA");

    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
    const inputImage = screen.getByTestId("image-input");
    const originalFileReader = window.FileReader;
    window.FileReader = class {
      constructor() {
        this.result = "data:image/png;base64,base64StringGiaLap";
      }
      readAsDataURL() {
        this.onload();
      }
    };

    await user.upload(inputImage, file);
    const doneBtn = screen.getByTestId("doneBtn");
    await user.click(doneBtn);

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining("/api/products"),
      expect.objectContaining({
        name: "Conan Tap 1",
        price: "20000",
        quantity: "100",
        category: "MANGA",
        imgBase64: "base64StringGiaLap",
      }),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: `Bearer ${mockToken}`,
        }),
      })
    );

    expect(onAdd).toHaveBeenCalledWith(mockResponse.data);
    expect(window.alert).toHaveBeenCalledWith("Success add new book");
    expect(checkCreate).toHaveBeenCalledWith(false);

    window.FileReader = originalFileReader;
  });
  it("Hien thi loi khi nhap ten sach rong", async () => {
    const user = userEvent.setup();
    const checkCreate = vi.fn();
    const onAdd = vi.fn();
    render(<CreateBook checkCreate={checkCreate} onAdd={onAdd} />);

    const nameInput = screen.getByTestId("input-name");

    await user.type(nameInput, "a");
    await user.clear(nameInput);

    expect(
      screen.getByText("Product name cannot be empty")
    ).toBeInTheDocument();
  });
  it("Hien thi loi khi nhap ten sach qua ngan", async () => {
    const user = userEvent.setup();
    const checkCreate = vi.fn();
    const onAdd = vi.fn();
    render(<CreateBook checkCreate={checkCreate} onAdd={onAdd} />);

    const nameInput = screen.getByTestId("input-name");

    await user.type(nameInput, "a");

    expect(
      screen.getByText("Product name must be between 3-100 characters")
    ).toBeInTheDocument();
  });
  it("Hien thi loi khi nhap ten sach qua dai", async () => {
    const user = userEvent.setup();
    const checkCreate = vi.fn();
    const onAdd = vi.fn();
    render(<CreateBook checkCreate={checkCreate} onAdd={onAdd} />);

    const nameInput = screen.getByTestId("input-name");
    const longName = "a".repeat(101);
    await user.click(nameInput);
    await user.paste(longName);

    expect(
      screen.getByText("Product name must be between 3-100 characters")
    ).toBeInTheDocument();
  });
  it("Hien thi loi khi nhap gia sach am", async () => {
    const user = userEvent.setup();
    const checkCreate = vi.fn();
    const onAdd = vi.fn();
    render(<CreateBook checkCreate={checkCreate} onAdd={onAdd} />);

    const nameInput = screen.getByTestId("input-price");

    await user.type(nameInput, "-5");

    expect(
      screen.getByText("Product price must be between 0-999,999,999 characters")
    ).toBeInTheDocument();
  });
  it("Hien thi loi khi nhap gia sach qua lon", async () => {
    const user = userEvent.setup();
    const checkCreate = vi.fn();
    const onAdd = vi.fn();
    render(<CreateBook checkCreate={checkCreate} onAdd={onAdd} />);

    const nameInput = screen.getByTestId("input-price");

    await user.type(nameInput, "1000000000");

    expect(
      screen.getByText("Product price must be between 0-999,999,999 characters")
    ).toBeInTheDocument();
  });
  it("Hien thi loi khi nhap so luong am", async () => {
    const user = userEvent.setup();
    const checkCreate = vi.fn();
    const onAdd = vi.fn();
    render(<CreateBook checkCreate={checkCreate} onAdd={onAdd} />);

    const nameInput = screen.getByTestId("input-quantity");

    await user.type(nameInput, "-5");

    expect(
      screen.getByText("Product quantity must be between 0-99,999 characters")
    ).toBeInTheDocument();
  });
  it("Hien thi loi khi nhap so luong qua lon", async () => {
    const user = userEvent.setup();
    const checkCreate = vi.fn();
    const onAdd = vi.fn();
    render(<CreateBook checkCreate={checkCreate} onAdd={onAdd} />);

    const nameInput = screen.getByTestId("input-quantity");

    await user.type(nameInput, "100000");

    expect(
      screen.getByText("Product quantity must be between 0-99,999 characters")
    ).toBeInTheDocument();
  });
  it("Hien thi loi khi nhap thong tin qua dai", async () => {
    const user = userEvent.setup();
    const checkCreate = vi.fn();
    const onAdd = vi.fn();
    render(<CreateBook checkCreate={checkCreate} onAdd={onAdd} />);

    const nameInput = screen.getByTestId("input-description");

    const longName = "a".repeat(501);
    await user.click(nameInput);
    await user.paste(longName);

    expect(
      screen.getByText("Product description cannot exceed 500 characters")
    ).toBeInTheDocument();
  });
  it("Test hien thi loi khi bam done", async () => {
    const user = userEvent.setup();
    const checkCreate = vi.fn();
    const onAdd = vi.fn();
    validateProduct.mockReturnValue({
      name: "Name is empty",
      quantity: "Quantity is invalid",
      price: "Product price must be between 0-999,999,999 characters",
      description: "Product description cannot exceed 500 characters",
    });

    render(<CreateBook checkCreate={checkCreate} onAdd={onAdd} />);

    const file = new File(["img"], "test.png", { type: "image/png" });
    const inputImage = screen.getByTestId("image-input");

    const originalFileReader = window.FileReader;
    window.FileReader = class {
      constructor() {
        this.result = "data:image/png;base64,fake";
      }
      readAsDataURL() {
        this.onload();
      }
    };
    await user.upload(inputImage, file);

    const doneBtn = screen.getByTestId("doneBtn");
    await user.click(doneBtn);

    expect(axios.post).not.toHaveBeenCalled();

    expect(screen.getByText("Name is empty")).toBeInTheDocument();
    expect(screen.getByText("Quantity is invalid")).toBeInTheDocument();
    expect(
      screen.getByText("Product price must be between 0-999,999,999 characters")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Product description cannot exceed 500 characters")
    ).toBeInTheDocument();

    window.FileReader = originalFileReader;
  });
});
