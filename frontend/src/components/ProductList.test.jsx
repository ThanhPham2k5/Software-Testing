import { it, expect, vi, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductList from "./ProductList";

vi.mock("./Product", () => ({
  default: ({ product, setSelectedProductId }) => (
    <div
      data-testid="mock-product-item"
      onClick={() => setSelectedProductId(product.id)}
    >
      {product.name}
    </div>
  ),
}));

describe("Test ProductList component", () => {
  const products = [
    {
      id: 1,
      name: "Dac nhan tam",
      price: 10000,
      quantity: 10,
      description: "demo",
      category: "Manga",
    },
    {
      id: 2,
      name: "Mindset",
      price: 20000,
      quantity: 20,
      description: "demo1",
      category: "Comic",
    },
  ];
  const setSelectedProductId = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("Test render", async () => {
    render(
      <ProductList
        products={products}
        setSelectedProductId={setSelectedProductId}
      />
    );

    const productContainers = await screen.getAllByTestId("mock-product-item");
    expect(productContainers.length).toBe(2);

    expect(screen.getByText("Dac nhan tam")).toBeInTheDocument();
    expect(screen.getByText("Mindset")).toBeInTheDocument();
  });
  it("Test nhan vao 1 san pham", async () => {
    const user = userEvent.setup();

    render(
      <ProductList
        products={products}
        setSelectedProductId={setSelectedProductId}
      />
    );

    const book = screen.getByText("Mindset");
    await user.click(book);

    expect(setSelectedProductId).toHaveBeenCalledTimes(1);
    expect(setSelectedProductId).toHaveBeenCalledWith(2);
  });
});
