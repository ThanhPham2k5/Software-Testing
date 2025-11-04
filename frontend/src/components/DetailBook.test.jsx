import { it, expect, describe, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DetailBook from "./DetailBook";
import axios from "axios";

vi.mock("axios");

describe("Test render component", () => {
  it("Test render", () => {
    const product = {
      name: "Dac nhan tam",
      price: 10000,
      quantity: 10,
      description: "demo",
      category: "Manga",
    };

    const checkShow = vi.fn();
    const checkModify = vi.fn();
    const checkDelete = vi.fn();
    render(
      <DetailBook
        product={product}
        checkShow={checkShow}
        checkModify={checkModify}
        checkDelete={checkDelete}
      />
    );
    expect(screen.getByText("Return")).toBeInTheDocument();
    expect(screen.getByTestId("detail-img")).toHaveAttribute(
      "src",
      "/card-picture-img-default.svg"
    );
    expect(screen.getByText("Dac nhan tam")).toBeInTheDocument();
    expect(screen.getByText("$10000")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("Description:")).toBeInTheDocument();
    expect(screen.getByTestId("desc-product")).toHaveValue("demo");
    expect(screen.getByText("Modify")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });
});

describe("Test user interactions", () => {
  it("Test return button", async () => {
    const product = {
      name: "Dac nhan tam",
      price: 10000,
      quantity: 10,
      description: "demo",
      category: "Manga",
    };

    const checkShow = vi.fn();
    const checkModify = vi.fn();
    const checkDelete = vi.fn();
    render(
      <DetailBook
        product={product}
        checkShow={checkShow}
        checkModify={checkModify}
        checkDelete={checkDelete}
      />
    );

    const user = userEvent.setup();
    const returnButton = screen.getByText("Return");
    await user.click(returnButton);

    expect(checkShow).toHaveBeenCalled();
  });

  it("Test modify button", async () => {
    const product = {
      name: "Dac nhan tam",
      price: 10000,
      quantity: 10,
      description: "demo",
      category: "Manga",
    };

    const checkShow = vi.fn();
    const checkModify = vi.fn();
    const checkDelete = vi.fn();
    render(
      <DetailBook
        product={product}
        checkShow={checkShow}
        checkModify={checkModify}
        checkDelete={checkDelete}
      />
    );

    const user = userEvent.setup();
    const modifyButton = screen.getByText("Modify");
    await user.click(modifyButton);

    expect(checkModify).toHaveBeenCalled();
  });

  it("Test delete button", async () => {
    const product = {
      id: 1,
      name: "Dac nhan tam",
      price: 10000,
      quantity: 10,
      description: "demo",
      category: "Manga",
    };

    const checkShow = vi.fn();
    const checkModify = vi.fn();
    const checkDelete = vi.fn();
    render(
      <DetailBook
        product={product}
        checkShow={checkShow}
        checkModify={checkModify}
        checkDelete={checkDelete}
      />
    );

    const user = userEvent.setup();
    const deleteButton = screen.getByText("Delete");
    await user.click(deleteButton);

    expect(axios.delete).toBeCalledWith(
      `http://localhost:8080/api/products/${product.id}`
    );
    expect(checkShow).toHaveBeenCalled();
    expect(checkDelete).toHaveBeenCalled();
  });
});
