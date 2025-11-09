import { it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductList from "./ProductList";

vi.mock("axios");

it("Test ProductList component với API", async () => {
  const products = [
    {
      id: "1",
      name: "Dac nhan tam",
      price: 10000,
      quantity: 10,
      description: "demo",
      category: "Manga",
    },
    {
      id: "2",
      name: "Mindset",
      price: 20000,
      quantity: 20,
      description: "demo1",
      category: "Comic",
    },
  ];
  const setSelectedProductId = vi.fn();

  render(
    <ProductList
      products={products}
      setSelectedProductId={setSelectedProductId}
    />
  );

  const productContainers = await screen.getAllByTestId("product-container");
  expect(productContainers.length).toBe(2);
});
