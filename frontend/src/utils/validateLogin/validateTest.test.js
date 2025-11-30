import { it, expect, describe } from "vitest";
import { validatePassword } from "./validatePassword";
import { validateUsername } from "./validateUsername";

describe("Test username rong", () => {
  it("username rong", () => {
    expect(validateUsername("")).toBe("Username cannot be empty.");
  });
});

describe("Test username qua ngan hoac qua dai", () => {
  it("username ngan", () => {
    expect(validateUsername("ab")).toBe("Username is too short.");
  });

  it("username dai", () => {
    const test = "a".repeat(51);
    expect(validateUsername(test)).toBe("Username is too long.");
  });
});

describe("Test ky tu dac biet khong hop le", () => {
  it("username co ky tu dac biet khong hop le", () => {
    expect(validateUsername("abc$")).toBe(
      "Special characters allowed are [_.-]"
    );
  });
});

describe("Test username hop le", () => {
  it("username hop le", () => {
    expect(validateUsername("abcd")).toBe("Username is valid.");
  });
});

describe("Test password rong", () => {
  it("password rong", () => {
    expect(validatePassword("")).toBe("Password cannot be empty.");
  });
});

describe("Test password qua ngan hoac qua dai", () => {
  it("password ngan", () => {
    expect(validatePassword("ab")).toBe("Password is too short.");
  });

  it("password dai", () => {
    expect(
      validatePassword(
        "abcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcde"
      )
    ).toBe("Password is too long.");
  });
});

describe("Test password khong co chu hoac so", () => {
  it("password khong co chu", () => {
    expect(validatePassword("123456")).toBe("Password must have letters.");
  });

  it("password khong co so", () => {
    expect(validatePassword("abcdef")).toBe("Password must have numbers.");
  });
});

describe("Test password hop le", () => {
  it("password hop le", () => {
    expect(validatePassword("abcd123")).toBe("Password is valid.");
  });
});
