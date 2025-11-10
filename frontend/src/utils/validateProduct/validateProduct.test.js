import { it, expect, describe } from "vitest";
import { validateProduct } from "./validateProduct";

describe("Product Validation Tests", () => {
  it("Test product name", () => {
    const product = {
      name: "",
      price: 10000,
      quantity: 10,
      description: "demo",
      category: "Manga",
    };
    expect(validateProduct(product)).toBe("Ten san pham rong");
  });

  it("Test product price am", () => {
    const product = {
      name: "Dac nhan tam",
      price: -5,
      quantity: 10,
      description: "demo",
      category: "Manga",
    };
    expect(validateProduct(product)).toBe(
      "Gia san pham phai > 0 va <= 999999999"
    );
  });

  it("Test product price qua lon", () => {
    const product = {
      name: "Dac nhan tam",
      price: 1000000000,
      quantity: 10,
      description: "demo",
      category: "Manga",
    };
    expect(validateProduct(product)).toBe(
      "Gia san pham phai > 0 va <= 999999999"
    );
  });

  it("Test product quantity am", () => {
    const product = {
      name: "Dac nhan tam",
      price: 10000,
      quantity: -5,
      description: "demo",
      category: "Manga",
    };
    expect(validateProduct(product)).toBe(
      "So luong san pham phai >=0 va <= 99999"
    );
  });

  it("Test product quantity qua lon", () => {
    const product = {
      name: "Dac nhan tam",
      price: 10000,
      quantity: 100000,
      description: "demo",
      category: "Manga",
    };
    expect(validateProduct(product)).toBe(
      "So luong san pham phai >=0 va <= 99999"
    );
  });

  it("Test product description qua lon", () => {
    const longString = "a".repeat(501);
    const product = {
      name: "Dac nhan tam",
      price: 10000,
      quantity: 10,
      description: longString,
      category: "Manga",
    };
    expect(validateProduct(product)).toBe("Mo ta san pham qua 500 ki tu");
  });

  it("Test product category", () => {
    const product = {
      name: "Dac nhan tam",
      price: 10000,
      quantity: 10,
      description: "demo",
      category: "Manga123",
    };
    expect(validateProduct(product)).toBe(
      "Loai sach phai la Manga hoac Comic hoac Novel"
    );
  });

  it("Test product hop le", () => {
    const product = {
      name: "Dac nhan tam",
      price: 10000,
      quantity: 10,
      description: "demo",
      category: "Manga",
    };
    expect(validateProduct(product)).toBe("San pham hop le");
  });
});
