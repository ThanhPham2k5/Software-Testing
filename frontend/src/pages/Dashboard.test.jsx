import { it, describe, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import Dashboard from "./Dashboard";

vi.mock("axios");

describe("Test Dashboard", () => {
  const mockToken = "mock-token-123";
  localStorage.setItem("accessToken", mockToken);
  const mockSetToken = vi.fn();

  const mockApiProducts = [
    { id: 1, name: "Conan Tap 1", category: "MANGA", price: 20 },
    { id: 2, name: "Dac Nhan Tam", category: "NOVEL", price: 50 },
    { id: 3, name: "Naruto", category: "MANGA", price: 30 },
  ];
  beforeEach(() => {
    vi.clearAllMocks();
    axios.get.mockResolvedValue({
      data: { content: mockApiProducts },
    });
  });

  it("Test render va API call", async () => {
    render(
      <MemoryRouter>
        <Dashboard setToken={mockSetToken} />
      </MemoryRouter>
    );

    expect(screen.getByText("gin")).toBeInTheDocument();
    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
    expect(screen.getByTestId("user")).toBeInTheDocument();
    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByTestId("category")).toBeInTheDocument();
    expect(screen.getByTestId("price")).toBeInTheDocument();
    expect(screen.getByTestId("content")).toBeInTheDocument();

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("/api/products"),
      expect.objectContaining({
        params: { page: 0, size: 1000 },
        headers: expect.objectContaining({
          Authorization: `Bearer ${mockToken}`,
        }),
      })
    );
  });
});
