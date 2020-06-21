/// <reference types="Cypress" />

context('Login y Logout', () => {
  beforeEach(() => {
    cy.visit('')
  })

  it('Hacer login', () => {
    cy.get('#email').should('be.visible')
    cy.get('#email').should('be.enabled')

    cy.get('#password').should('be.visible')
    cy.get('#password').should('be.enabled')

    cy.get('#email').type('test@mailinator.com')
    cy.get('#password').type('123456')
    cy.get('button.botonbonito').click()

    // Validar que si hice log in
    cy.get('.navbar-brand').should('contain.text', 'Juan Perez')

    cy.get('#navbarsExampleDefault li').should('have.length', 4)

    cy.get('#navbarsExampleDefault a').contains('Logout').click()
  })
})
