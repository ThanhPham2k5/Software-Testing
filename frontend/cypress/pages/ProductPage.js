class ProductPage{
    visit(){
        cy.visit('http://localhost:5173/admin/dashboard');
    }

    clickAddNew(){
        cy.get('.create-button').click();
    }

    clickModify(){
        cy.get('.modify-button-text').click();
    }

    clickDelete(){
        cy.get('.delete-button-text').click();
    }

    clickProduct(name){
        this.getProductInList(name).click();
    }

    clickSearchBtn(){
        cy.get('.search-bar-button').click();
    }

    fillSearchBar(search){
        cy.get('input[id="searchBar"]').type(search);
    }

    fillProductForm(product){
        // Nhập dữ liệu 
        cy.get('input[id="name"]').type(product.name);
        cy.get('input[id="price"]').type(product.price);
        cy.get('input[id="quantity"]').type(product.quantity);
        cy.get('select[id="category"]').select(product.category);
        cy.get('textarea[id="desc"]').type(product.description);

        // Chọn ảnh
        cy.get('[data-testid="picture-box"]').click();
        cy.get('[data-testid="image-input"]')
        .selectFile('cypress/fixtures/test-img.png', { force: true });
    }

    submitForm(){
        cy.get('[data-testid="doneBtn"]').click();
    }


    getProductInList(name){
        return cy.contains('.card-name', name).parents('[data-testid="product-container"]');
    }
}

export default new ProductPage();