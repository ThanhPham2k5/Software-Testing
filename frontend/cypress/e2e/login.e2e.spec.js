import LoginPage from "../pages/LoginPage"

describe('Login E2E Tests', () => {
  beforeEach(() =>{
    LoginPage.visit();
  });

  it('Should show login form', () => {
    LoginPage.getUserInput().should('be.visible');
    LoginPage.getPasswordInput().should('be.visible');
    LoginPage.getLoginButton().should('be.visible');
  });

  it('Should login succesfully with valid credentials', () =>{
    LoginPage.fillUser('Admin');
    LoginPage.fillPassword('@Admin123');
    LoginPage.clickLogin();

    LoginPage.getAPIMessage().should('be.visible').and('have.text', 'successful');
    cy.url().should('include', '/admin/dashboard'); //kiểm tra url hiện tại
  });

  it('Should login sends error message with invalid credentials', () =>{
    LoginPage.fillUser('wrongUser');
    LoginPage.fillPassword('WrongPassword');
    LoginPage.clickLogin();

    LoginPage.getAPIMessage().should('be.visible').and('have.text', 'Da co loi xay ra, vui long thu lai');
  });
})