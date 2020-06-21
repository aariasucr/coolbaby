/// <reference types="Cypress" />

context('Login y Logout anonimo', () => {
  beforeEach(() => {
    cy.visit('')
  })

  it('Hacer login anonimo', () => {
    cy.title().should('eq', 'CoolBaby')

    cy.get('#botonAnonimo').click()
    cy.checkToastr({
      title: {
        name: '.toast-title',
        text: 'Bienvenido a Cool Baby'
      },
      message: {
        name: '.toast-message',
        text: 'como usuario anónimo'
      }
    })
    cy.get('div.nav-profile-text > a > p.text-black').should('contain.text', 'Anon')

    cy.wait(7000)
    cy.get('li.nav-logout > a.nav-link').click()
  })
})
