/// <reference types="Cypress" />

context('Login y Logout', () => {
  beforeEach(() => {
    cy.visit('')
  })

  it('Hacer login', () => {
    cy.title().should('eq', 'CoolBaby')

    cy.get('#email').should('be.visible')
    cy.get('#email').should('be.enabled')

    cy.get('#password').should('be.visible')
    cy.get('#password').should('be.enabled')

    cy.get('#email').type('prueba@prueba.com', { delay: 100 })
    cy.get('#password').type('prueba1234', { delay: 100 })
    cy.get('#botonLogin').click()
    cy.get('.toast-message').should('be.visible')
    cy.get('.toast-title').should('be.visible')
    cy.get('.toast-title').should('contain.text', 'Bienvenido a Cool Baby')
    cy.get('.toast-message').should('contain.text', 'Ha iniciado sesión')
    cy.get('div.nav-profile-text > a > p.text-black').should('contain.text', 'usuarioPrueba')

    cy.wait(7000)
    cy.get('li.nav-logout > a.nav-link').click()
  })
})
