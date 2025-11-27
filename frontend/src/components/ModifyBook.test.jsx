import { it, describe, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import ModifyBook from "./ModifyBook";
import { validateProduct } from "../utils/validateProduct/validateProduct";

vi.mock("axios");
vi.mock("../utils/validateProduct/validateProduct", () => ({
  validateProduct: vi.fn(() => ({})),
}));

describe("Test ModifyBook component", () => {
  const mockProduct = {
    id: 99,
    name: "Old Book Name",
    price: 50000,
    quantity: 10,
    description: "Old Description",
    category: "COMIC",
    imgBase64: "oldImageBase64",
  };

  const mockCheckModify = vi.fn();
  const mockOnSave = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    window.alert = vi.fn();
    validateProduct.mockReturnValue({});
  });

  it("Test render", () => {
    render(
      <ModifyBook
        product={mockProduct}
        checkModify={mockCheckModify}
        onSave={mockOnSave}
      />
    );

    expect(screen.getByText("Modify Book")).toBeInTheDocument();
    expect(screen.getByText("Return")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();

    expect(screen.getByTestId("input-name")).toHaveValue("Old Book Name");
    expect(screen.getByTestId("input-price")).toHaveValue(50000);
    expect(screen.getByTestId("input-quantity")).toHaveValue(10);
    expect(screen.getByTestId("input-description")).toHaveValue(
      "Old Description"
    );
    expect(screen.getByTestId("select-category")).toHaveValue("COMIC");

    const img = screen.getByAltText("picture-img");
    expect(img).toHaveAttribute(
      "src",
      `data:image/jpeg;base64,${mockProduct.imgBase64}`
    );
  });

  it("Test nut return", async () => {
    const user = userEvent.setup();
    render(
      <ModifyBook
        product={mockProduct}
        checkModify={mockCheckModify}
        onSave={mockOnSave}
      />
    );

    const returnBtn = screen.getByText("Return");
    await user.click(returnBtn);

    expect(mockCheckModify).toHaveBeenCalledWith(false);
  });

  it("Test sua thong tin thanh cong", async () => {
    const mockToken = "mock-token-123";
    localStorage.setItem("accessToken", mockToken);
    const user = userEvent.setup();

    const apiResponse = { data: { ...mockProduct, name: "New Name" } };
    axios.put.mockResolvedValue(apiResponse);

    render(
      <ModifyBook
        product={mockProduct}
        checkModify={mockCheckModify}
        onSave={mockOnSave}
      />
    );

    const nameInput = screen.getByTestId("input-name");
    await user.clear(nameInput);
    await user.type(nameInput, "New Name Edited");

    const priceInput = screen.getByTestId("input-price");
    await user.clear(priceInput);
    await user.type(priceInput, "99000");

    const doneBtn = screen.getByTestId("doneBtn");
    await user.click(doneBtn);

    expect(axios.put).toHaveBeenCalledWith(
      expect.stringContaining("/api/products/99"),
      expect.objectContaining({
        name: "New Name Edited",
        price: "99000",
        quantity: 10,
        category: "COMIC",
        imgBase64: "oldImageBase64",
      }),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: `Bearer ${mockToken}`,
        }),
      })
    );

    expect(mockOnSave).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 99,
        name: "New Name Edited",
        price: "99000",
      })
    );

    expect(window.alert).toHaveBeenCalledWith("Success modify book");
    expect(mockCheckModify).toHaveBeenCalledWith(false);
  });

  it("Test sua anh thanh cong", async () => {
    const mockToken = "mock-token-123";
    localStorage.setItem("accessToken", mockToken);
    const user = userEvent.setup();
    const originalFileReader = window.FileReader;
    window.FileReader = class {
      constructor() {
        this.result = "data:image/png;base64,NewImageBase64";
      }
      readAsDataURL() {
        this.onload();
      }
    };

    axios.put.mockResolvedValue({ data: {} });

    render(
      <ModifyBook
        product={mockProduct}
        checkModify={mockCheckModify}
        onSave={mockOnSave}
      />
    );

    const file = new File(["(new)"], "new.png", { type: "image/png" });
    const inputImage = screen.getByTestId("image-input");

    await user.upload(inputImage, file);
    await user.click(screen.getByTestId("doneBtn"));

    expect(axios.put).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        imgBase64: "NewImageBase64",
      }),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: `Bearer ${mockToken}`,
        }),
      })
    );

    window.FileReader = originalFileReader;
  });

  it("Hien thi loi khi nhap ten sach rong", async () => {
    const user = userEvent.setup();
    render(
      <ModifyBook
        product={mockProduct}
        checkModify={mockCheckModify}
        onSave={mockOnSave}
      />
    );

    const nameInput = screen.getByTestId("input-name");
    await user.clear(nameInput);

    expect(
      screen.getByText("Product name cannot be empty")
    ).toBeInTheDocument();
  });
  it("Hien thi loi khi nhap ten sach qua ngan", async () => {
    const user = userEvent.setup();
    render(
      <ModifyBook
        product={mockProduct}
        checkModify={mockCheckModify}
        onSave={mockOnSave}
      />
    );

    const nameInput = screen.getByTestId("input-name");
    await user.clear(nameInput);
    await user.type(nameInput, "a");

    expect(
      screen.getByText("Product name must be between 3-100 characters")
    ).toBeInTheDocument();
  });
  it("Hien thi loi khi nhap ten sach qua dai", async () => {
    const user = userEvent.setup();
    render(
      <ModifyBook
        product={mockProduct}
        checkModify={mockCheckModify}
        onSave={mockOnSave}
      />
    );

    const nameInput = screen.getByTestId("input-name");
    await user.clear(nameInput);
    const longName = "a".repeat(101);
    await user.click(nameInput);
    await user.paste(longName);

    expect(
      screen.getByText("Product name must be between 3-100 characters")
    ).toBeInTheDocument();
  });
  it("Hien thi loi khi nhap gia sach am", async () => {
    const user = userEvent.setup();
    render(
      <ModifyBook
        product={mockProduct}
        checkModify={mockCheckModify}
        onSave={mockOnSave}
      />
    );

    const nameInput = screen.getByTestId("input-price");
    await user.clear(nameInput);
    await user.type(nameInput, "-5");

    expect(
      screen.getByText("Product price must be between 0-999,999,999 characters")
    ).toBeInTheDocument();
  });
  it("Hien thi loi khi nhap gia sach qua lon", async () => {
    const user = userEvent.setup();
    render(
      <ModifyBook
        product={mockProduct}
        checkModify={mockCheckModify}
        onSave={mockOnSave}
      />
    );

    const nameInput = screen.getByTestId("input-price");
    await user.clear(nameInput);
    await user.type(nameInput, "1000000000");

    expect(
      screen.getByText("Product price must be between 0-999,999,999 characters")
    ).toBeInTheDocument();
  });
  it("Hien thi loi khi nhap so luong am", async () => {
    const user = userEvent.setup();
    render(
      <ModifyBook
        product={mockProduct}
        checkModify={mockCheckModify}
        onSave={mockOnSave}
      />
    );

    const nameInput = screen.getByTestId("input-quantity");
    await user.clear(nameInput);
    await user.type(nameInput, "-5");

    expect(
      screen.getByText("Product quantity must be between 0-99,999 characters")
    ).toBeInTheDocument();
  });
  it("Hien thi loi khi nhap so luong qua lon", async () => {
    const user = userEvent.setup();
    render(
      <ModifyBook
        product={mockProduct}
        checkModify={mockCheckModify}
        onSave={mockOnSave}
      />
    );

    const nameInput = screen.getByTestId("input-quantity");
    await user.clear(nameInput);
    await user.type(nameInput, "100000");

    expect(
      screen.getByText("Product quantity must be between 0-99,999 characters")
    ).toBeInTheDocument();
  });
  it("Hien thi loi khi nhap thong tin qua dai", async () => {
    const user = userEvent.setup();
    render(
      <ModifyBook
        product={mockProduct}
        checkModify={mockCheckModify}
        onSave={mockOnSave}
      />
    );

    const nameInput = screen.getByTestId("input-description");
    await user.clear(nameInput);
    const longName = "a".repeat(501);
    await user.click(nameInput);
    await user.paste(longName);

    expect(
      screen.getByText("Product description cannot exceed 500 characters")
    ).toBeInTheDocument();
  });
});
