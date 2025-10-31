import { it, expect, describe } from "vitest";
import { validatePassword } from "./validatePassword";
import { validateUsername } from "./validateUsername";

describe("Test username rong", () => {
  it("username rong", () => {
    expect(validateUsername("")).toBe("username rong");
  });
});

describe("Test username qua ngan hoac qua dai", () => {
  it("username ngan", () => {
    expect(validateUsername("ab")).toBe("username qua ngan");
  });

  it("username dai", () => {
    expect(
      validateUsername(
        "abcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcde"
      )
    ).toBe("username qua dai");
  });
});

describe("Test ky tu dac biet khong hop le", () => {
  it("username co ky tu dac biet khong hop le", () => {
    expect(validateUsername("abc$")).toBe("ky tu dac biet khong hop le");
  });
});

describe("Test username hop le", () => {
  it("username hop le", () => {
    expect(validateUsername("abcd")).toBe("username hop le");
  });
});

describe("Test password rong", () => {
  it("password rong", () => {
    expect(validatePassword("")).toBe("password rong");
  });
});

describe("Test password qua ngan hoac qua dai", () => {
  it("password ngan", () => {
    expect(validatePassword("ab")).toBe("password qua ngan");
  });

  it("password dai", () => {
    expect(
      validatePassword(
        "abcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcde"
      )
    ).toBe("password qua dai");
  });
});

describe("Test password khong co chu hoac so", () => {
  it("password khong co chu", () => {
    expect(validatePassword("123456")).toBe("password khong co chu");
  });

  it("password khong co so", () => {
    expect(validatePassword("abcdef")).toBe("password khong co so");
  });
});

describe("Test password hop le", () => {
  it("password hop le", () => {
    expect(validatePassword("abcd123")).toBe("password hop le");
  });
});
