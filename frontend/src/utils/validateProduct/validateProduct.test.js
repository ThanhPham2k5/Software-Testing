import { it, expect, describe } from "vitest";
import { validateProduct } from "./validateProduct";

describe("Product Validation Tests", () => {
  it("Test product name rong", () => {
    const product = {
      name: "",
      price: 10000,
      quantity: 10,
      description: "demo",
      category: "MANGA",
    };
    expect(validateProduct(product)).toEqual({
      name: "Product name cannot be empty",
    });
  });

  it("Test product name qua ngan", () => {
    const product = {
      name: "ab",
      price: 10000,
      quantity: 10,
      description: "demo",
      category: "MANGA",
    };
    expect(validateProduct(product)).toEqual({
      name: "Product name must be between 3-100 characters",
    });
  });

  it("Test product name qua dai", () => {
    const product = {
      name: "abc".repeat(100),
      price: 10000,
      quantity: 10,
      description: "demo",
      category: "MANGA",
    };
    expect(validateProduct(product)).toEqual({
      name: "Product name must be between 3-100 characters",
    });
  });

  it("Test product price am", () => {
    const product = {
      name: "Dac nhan tam",
      price: -5,
      quantity: 10,
      description: "demo",
      category: "MANGA",
    };
    expect(validateProduct(product)).toEqual({
      price: "Product price must be between 0-999,999,999 characters",
    });
  });

  it("Test product price qua lon", () => {
    const product = {
      name: "Dac nhan tam",
      price: 1000000000,
      quantity: 10,
      description: "demo",
      category: "MANGA",
    };
    expect(validateProduct(product)).toEqual({
      price: "Product price must be between 0-999,999,999 characters",
    });
  });

  it("Test product quantity am", () => {
    const product = {
      name: "Dac nhan tam",
      price: 10000,
      quantity: -5,
      description: "demo",
      category: "MANGA",
    };
    expect(validateProduct(product)).toEqual({
      quantity: "Product quantity must be between 0-99,999 characters",
    });
  });

  it("Test product quantity qua lon", () => {
    const product = {
      name: "Dac nhan tam",
      price: 10000,
      quantity: 100000,
      description: "demo",
      category: "MANGA",
    };
    expect(validateProduct(product)).toEqual({
      quantity: "Product quantity must be between 0-99,999 characters",
    });
  });

  it("Test product description qua lon", () => {
    const longString = "a".repeat(501);
    const product = {
      name: "Dac nhan tam",
      price: 10000,
      quantity: 10,
      description: longString,
      category: "MANGA",
    };
    expect(validateProduct(product)).toEqual({
      description: "Product description cannot exceed 500 characters",
    });
  });

  it("Test product category invalid", () => {
    const product = {
      name: "Dac nhan tam",
      price: 10000,
      quantity: 10,
      description: "demo",
      category: "Manga123",
    };
    expect(validateProduct(product)).toEqual({
      category: "Invalid category",
    });
  });

  it("Test product hop le", () => {
    const product = {
      name: "Dac nhan tam",
      price: 10000,
      quantity: 10,
      description: "demo",
      category: "MANGA",
    };
    expect(validateProduct(product)).toEqual({});
  });
});
