class LoginPage{
    visit() {
        cy.visit('http://localhost:5173/login');
    }

    getUserInput(){
        return cy.get('input[data-testid="username-input"]');
    }

    getPasswordInput(){
        return cy.get('input[data-testid="password-input"]');
    }

    getLoginButton(){
        return cy.get('button[data-testid="form-button"]');
    }

    getAPIMessage(){
        return cy.get('div[data-testid="api-message"]');
    }

    getUsernameValidation(){
        return cy.get('div[data-testid="username-test"]');
    }

    getPasswordValidation(){
        return cy.get('div[data-testid="password-test"]');
    }

    getPasswordToggle(){
        return cy.get('.form-eye-ico');
    }

    focusUser(){
        this.getUserInput().focus();
    }

    focusPassword(){
        this.getPasswordInput().focus();
    }

    fillUser(username){
        this.getUserInput().type(username);
    }

    fillPassword(password){
        this.getPasswordInput().clear().type(password);
    }

    clickLogin() {
        this.getLoginButton().click();
    }
}

export default new LoginPage();