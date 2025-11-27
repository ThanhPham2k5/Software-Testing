/* eslint-disable no-undef */
import LoginPage from "../pages/LoginPage";
import ProductPage from "../pages/ProductPage";

describe("Product E2E Tests", () => {
  beforeEach(() => {
    LoginPage.visit();
    LoginPage.fillUser("admin");
    LoginPage.fillPassword("@Admin123");
    LoginPage.clickLogin();
    // ProductPage.visit();
  });

  it("Should Create product successfully", () => {
    const alertStub = cy.stub(); // create a stub
    cy.on("window:alert", alertStub); // listen for alert

    ProductPage.clickAddNew();
    ProductPage.fillProductForm({
      name: "Test product",
      price: 5.67,
      quantity: 10,
      category: "COMIC",
      description: "test desc",
    });

    ProductPage.submitForm();
    cy.wrap(alertStub).should("have.been.calledWith", "Success add new book");
    ProductPage.getProductInList("Test product").should("exist");
  });

  it("Should display list of product correctly", () => {
    // Check number of listed products
    cy.get('[data-testid="product-container"]').should(
      "have.length.at.least",
      8
    );

    // validate card structure
    cy.get('[data-testid="product-container"]')
      .first()
      .within(() => {
        cy.get(".card-name").should("exist");
        cy.get(".card-price").should("exist");
        cy.get(".card-quantity").should("exist");
        cy.get("img").should("be.visible");
      });

    ProductPage.clickProduct("Classic NoteBook");
    cy.get(".detail-title").should("exist");
    cy.get(".detail-price").should("exist");
    cy.get(".detail-quantity-number").should("exist");
    cy.get('[data-testid="desc-product"]').should("exist");
    cy.get('img[alt="detail-img"]').should("be.visible");
    cy.get(".return-button").should("exist");
    cy.get(".modify-button-text").should("exist");
    cy.get(".delete-button-text").should("exist");
  });

  it("Should Modify product successfully", () => {
    const alertStub = cy.stub(); // create a stub
    cy.on("window:alert", alertStub); // listen for alert

    ProductPage.clickProduct("Classic NoteBook");
    ProductPage.clickModify();
    cy.get('input[id="price"]').clear().type(10.52);
    ProductPage.submitForm();
    cy.wrap(alertStub).should("have.been.calledWith", "Success modify book");
    cy.get(".detail-price").should("contain", "10.52");
  });

  it("Should Delete product successfully", () => {
    ProductPage.clickProduct("Classic NoteBook");
    ProductPage.clickDelete();
    cy.contains(".card-name", "Classic NoteBook").should("not.exist");
  });

  it("Should show correct product when search for", () => {
    ProductPage.fillSearchBar("Naruto");
    ProductPage.clickSearchBtn();
    cy.get('[data-testid="product-container"]').should("have.length", 1);
    cy.contains(".card-name", "Naruto Vol. 1").should("exist");
  });

  it("Should show correct product when filter for", () => {
    cy.get('[data-testid="product-container"]').should("have.length", 8);

    cy.contains("label.radio", "Comic").click();
    cy.get('[data-testid="product-container"]').should(
      "have.length.at.least",
      4
    );
    cy.get('[data-testid="product-container"]')
      .first()
      .within(() => {
        cy.get(".card-price").invoke("text").should("eq", "8.69");
      });

    cy.get("#low-to-high").check({ force: true });
    cy.get('[data-testid="product-container"]').should(
      "have.length.at.least",
      4
    );
    cy.get('[data-testid="product-container"]')
      .first()
      .within(() => {
        cy.get(".card-price").invoke("text").should("eq", "5.28");
      });

    cy.get('input[id="price-input"]').parents(".price-typing").type(5.28);
    cy.get(".price-typing-text").click();
    cy.get('[data-testid="product-container"]').should("have.length", 2);
  });
});
