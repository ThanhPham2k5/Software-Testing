import { it, expect, describe, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DetailBook from "./DetailBook";
import axios from "axios";

vi.mock("axios");

describe("Test render");
