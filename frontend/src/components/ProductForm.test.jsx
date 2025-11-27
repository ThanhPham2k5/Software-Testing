import { it, describe, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductForm from "./ProductForm";

vi.mock("../components/CreateBook", () => ({
  default: () => (
    <div data-testid="mock-create-book">Mock Create Book Form</div>
  ),
}));
vi.mock("../components/DetailBook", () => ({
  default: ({ product }) => (
    <div data-testid="mock-detail-book">Detail of {product.name}</div>
  ),
}));
vi.mock("../components/ModifyBook", () => ({
  default: () => <div data-testid="mock-modify-book">Mock Modify Book</div>,
}));
vi.mock("../components/ProductList", () => ({
  default: ({ products, setSelectedProductId }) => (
    <div data-testid="mock-product-list">
      {products.map((p) => (
        <div
          key={p.id}
          data-testid={`product-item-${p.id}`}
          onClick={() => setSelectedProductId(p.id)}
        >
          {p.name}
        </div>
      ))}
    </div>
  ),
}));

describe("Test ProductForm component", () => {
  const mockProducts = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Book ${i + 1}`,
    price: 100,
    category: "COMIC",
  }));

  const mockSetProducts = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("Test render", () => {
    render(
      <ProductForm products={mockProducts} setProducts={mockSetProducts} />
    );

    expect(screen.getByText("New Book")).toBeInTheDocument();
    expect(screen.getByTestId("mock-product-list")).toBeInTheDocument();

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();

    expect(screen.queryByTestId("mock-create-book")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-modify-book")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-detail-book")).not.toBeInTheDocument();
  });

  it("Test nut new book", async () => {
    const user = userEvent.setup();
    render(
      <ProductForm products={mockProducts} setProducts={mockSetProducts} />
    );

    expect(screen.getByTestId("mock-product-list")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-create-book")).not.toBeInTheDocument();

    const newBookBtn = screen.getByText("New Book");
    await user.click(newBookBtn);

    expect(screen.getByTestId("mock-create-book")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-product-list")).not.toBeInTheDocument();
  });

  it("Test nhan vao 1 san pham", async () => {
    const user = userEvent.setup();
    render(
      <ProductForm products={mockProducts} setProducts={mockSetProducts} />
    );

    const productItem = screen.getByTestId("product-item-1");
    await user.click(productItem);

    expect(screen.getByTestId("mock-detail-book")).toBeInTheDocument();
    expect(screen.getByText("Detail of Book 1")).toBeInTheDocument();

    expect(screen.queryByTestId("mock-product-list")).not.toBeInTheDocument();
  });

  it("Test phan trang", async () => {
    const user = userEvent.setup();
    render(
      <ProductForm products={mockProducts} setProducts={mockSetProducts} />
    );

    expect(screen.getByText("Book 1")).toBeInTheDocument();
    expect(screen.getByText("Book 8")).toBeInTheDocument();
    expect(screen.queryByText("Book 9")).not.toBeInTheDocument();

    const page2Btn = screen.getByText("2", { selector: ".page-number" });
    await user.click(page2Btn);

    expect(screen.queryByText("Book 1")).not.toBeInTheDocument();
    expect(screen.getByText("Book 9")).toBeInTheDocument();
    expect(screen.getByText("Book 16")).toBeInTheDocument();

    expect(page2Btn).toHaveClass("page-selected");
  });
});
