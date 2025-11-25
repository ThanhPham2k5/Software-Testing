import { it, describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Product from "./Product";

describe("Product Component Tests", () => {
  const mockProduct = {
    id: 999,
    name: "Doraemon Tap 1",
    price: 25000,
    quantity: 50,
    imgBase64: "SampleBase64String",
  };
  it("Test render", () => {
    render(<Product product={mockProduct} setSelectedProductId={vi.fn()} />);

    expect(screen.getByText("Doraemon Tap 1")).toBeInTheDocument();
    expect(screen.getByText("25000")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
    const img = screen.getByAltText("card-picture-img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      "src",
      "data:image/jpeg;base64,SampleBase64String"
    );
  });

  it("Test nhan vao san pham", async () => {
    const user = userEvent.setup();
    const mockSetSelected = vi.fn();

    render(
      <Product product={mockProduct} setSelectedProductId={mockSetSelected} />
    );

    const cardContainer = screen.getByTestId("product-container");
    await user.click(cardContainer);

    expect(mockSetSelected).toHaveBeenCalledTimes(1);
    expect(mockSetSelected).toHaveBeenCalledWith(999);
  });
});
