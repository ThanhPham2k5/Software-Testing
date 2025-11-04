import { it, expect, describe, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import axios from "axios";

vi.mock("axios");

it("Test ProductList component với API", () => {
  axios.get.mockImplementation();
});
