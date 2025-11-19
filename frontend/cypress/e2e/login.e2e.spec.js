/* eslint-disable no-undef */
import LoginPage from "../pages/LoginPage";

describe("Login E2E Tests", () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it("Should show login form", () => {
    LoginPage.getUserInput().should("be.visible");
    LoginPage.getPasswordInput().should("be.visible");
    LoginPage.getLoginButton().should("be.visible");
    LoginPage.getPasswordToggle().should("be.visible");
  });

  it("Should login succesfully with valid credentials", () => {
    LoginPage.fillUser("admin");
    LoginPage.fillPassword("@Admin123");
    LoginPage.clickLogin();

    cy.url({ timeout: 10000 }).should("include", "/admin/dashboard");
  });

  it('Should show validation message "Password cannot be empty." for empty password', () => {
    LoginPage.fillUser("admin");
    LoginPage.clickLogin();
    LoginPage.getPasswordValidation()
      .should("be.visible")
      .and("have.text", "Password cannot be empty.");
  });

  const invalidPasswordCases = [
    { password: "123", message: "Password is too short." },
    {
      password:
        "averylongpasswordthatexceedslimitaverylongpasswordthatexceedslimitaverylongpasswordthatexceedslimitaverylongpasswordthatexceedslimit",
      message: "Password is too long.",
    },
    { password: "!!!!!!", message: "Password must have letters." },
    { password: "NoNumbers", message: "Password must have numbers." },
  ];

  invalidPasswordCases.forEach(({ password, message }) => {
    it(`Should show validation message "${message}" for password:${password}`, () => {
      cy.visit("http://localhost:5173/login");
      LoginPage.fillUser("admin");
      LoginPage.fillPassword(password);
      LoginPage.clickLogin();
      LoginPage.getPasswordValidation()
        .should("be.visible")
        .and("have.text", message);
    });
  });

  it('Should show validation message "Username cannot be empty." for empty username', () => {
    LoginPage.fillPassword("@Admin123");
    LoginPage.clickLogin();
    LoginPage.getUsernameValidation()
      .should("be.visible")
      .and("have.text", "Username cannot be empty.");
  });

  const invalidUsernameCases = [
    { username: "a", message: "Username is too short." },
    {
      username:
        "averylongpasswordthatexceedslimitaverylongpasswordthatexceedslimitaverylongpasswordthatexceedslimitaverylongpasswordthatexceedslimit",
      message: "Username is too long.",
    },
    { username: "@#$#%$^", message: "Special characters allowed are [_.-]" },
  ];

  invalidUsernameCases.forEach(({ username, message }) => {
    it(`Should show validation message "${message}" for username:${username}`, () => {
      cy.visit("http://localhost:5173/login");
      LoginPage.fillUser(username);
      LoginPage.fillPassword("@Admin123");
      LoginPage.clickLogin();
      LoginPage.getUsernameValidation()
        .should("be.visible")
        .and("have.text", message);
    });
  });

  it("Should focus username input", () => {
    LoginPage.focusUser();
    LoginPage.getUserInput().should("have.focus");
  });

  it("Should focus password input", () => {
    LoginPage.focusPassword();
    LoginPage.getPasswordInput().should("have.focus");
  });

  it("Should toggle password visibility", () => {
    LoginPage.fillPassword("@Admin123");
    LoginPage.getPasswordToggle().click();
    LoginPage.getPasswordInput().should("have.attr", "type", "text");
  });

  it("Should return to website", () => {
    const pic_button = cy.get(".pic-button");
    pic_button.should("be.visible");
    pic_button.click();

    cy.url().should("include", "/");
  });
});
