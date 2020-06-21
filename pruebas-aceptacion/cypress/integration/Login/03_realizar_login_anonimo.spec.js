/// <reference types="Cypress" />

context('Login y Logout anonimo', () => {
  beforeEach(() => {
    cy.visit('')
  })

  it('Hacer login anonimo', () => {
    cy.title().should('eq', 'CoolBaby')

    cy.get('#botonAnonimo').click()
    cy.get('.toast-message').should('be.visible')
    cy.get('.toast-title').should('be.visible')
    cy.get('.toast-title').should('contain.text', 'Bienvenido a Cool Baby')
    cy.get('.toast-message').should('contain.text', 'como usuario anónimo')
    cy.get('div.nav-profile-text > a > p.text-black').should('contain.text', 'Anon')

    cy.wait(7000)
    cy.get('li.nav-logout > a.nav-link').click()
  })
})
