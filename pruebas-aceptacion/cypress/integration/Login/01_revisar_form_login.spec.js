/// <reference types="Cypress" />

const resetearInputs = function (cy) {
  cy.get('#email').clear()
  cy.get('#password').clear()
}

context('Formulario de Login', () => {
  beforeEach(() => {
    cy.visit('')
  })

  it('Revisar validaciones formulario login', () => {
    cy.title().should('eq', 'CoolBaby')

    cy.get('#email').should('be.visible')
    cy.get('#email').should('be.enabled')

    cy.get('#password').should('be.visible')
    cy.get('#password').should('be.enabled')

    cy.get('#botonLogin').should('be.visible')
    cy.get('#botonLogin').should('be.enabled')

    cy.get('#botonAnonimo').should('be.visible')
    cy.get('#botonAnonimo').should('be.enabled')

    cy.get('a.text-primary').should('be.visible')

    cy.get('#email').type('incorrecto', { delay: 100 })
    cy.get('#password').type('incorrecto', { delay: 100 })
    cy.get('#botonLogin').click()
    cy.get('.toast-message').should('be.visible')
    cy.get('.toast-title').should('be.visible')
    cy.get('.toast-title').should('contain.text', 'Error en la autenticación')
    cy.get('.toast-message').should('contain.text', 'The email address is badly')

    resetearInputs(cy)
    cy.get('#email').type('incorrecto@incorrecto.com', { delay: 100 })
    cy.get('#password').type('incorrecto', { delay: 100 })
    cy.get('#botonLogin').click()
    cy.get('.toast-message').should('be.visible')
    cy.get('.toast-title').should('be.visible')
    cy.get('.toast-title').should('contain.text', 'Error en la autenticación')
    cy.get('.toast-message').should('contain.text', 'There is no user record')

    resetearInputs(cy)
    cy.get('#botonLogin').click()
    cy.get('.toast-message').should('be.visible')
    cy.get('.toast-title').should('be.visible')
    cy.get('.toast-title').should('contain.text', 'Error en la autenticación')
    cy.get('.toast-message').should('contain.text', 'The email address is badly')
  })
})
