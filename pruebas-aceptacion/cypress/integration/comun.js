export const resetearInputs = function (cy, campo) {
    cy.get(campo).clear()
}

export const checkElemento = function (cy, elemento) {
    cy.get(elemento).should('be.visible')
    cy.get(elemento).should('be.enabled')
}

export const digitar = function (cy, elemento, texto) {
    cy.get(elemento).type(texto, { delay: 100 })
}

export const checkToastr = function (cy, titulo, mensaje) {
    cy.get('.toast-message').should('be.visible')
    cy.get('.toast-title').should('be.visible')
    cy.get('.toast-title').should('contain.text', titulo)
    cy.get('.toast-message').should('contain.text', mensaje)
}