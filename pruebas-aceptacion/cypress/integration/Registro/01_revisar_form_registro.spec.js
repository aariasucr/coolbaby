/// <reference types="Cypress" />

const resetearInputs = function (cy) {
  cy.get('#email').clear()
  cy.get('#password').clear()
  cy.get('#userName').clear()
  cy.get('#fullName').clear()
}

context('Formulario de Registro', () => {
  beforeEach(() => {
    cy.visit('')
  })

  it('Revisar validaciones formulario registro', () => {
    cy.title().should('eq', 'CoolBaby')

    cy.get('a.text-primary').should('be.visible')
    cy.wait(2000)
    cy.get('a.text-primary').click()

    cy.reload()

    cy.get('div.auth-form-light > h4').should('contain.text', 'Bienvenido a COOL BABY!')

    cy.get('#email').should('be.visible')
    cy.get('#email').should('be.enabled')
    cy.get('#password').should('be.visible')
    cy.get('#password').should('be.enabled')
    cy.get('#userName').should('be.visible')
    cy.get('#userName').should('be.enabled')
    cy.get('#fullName').should('be.visible')
    cy.get('#fullName').should('be.enabled')
    cy.get('#botonRegistro').should('be.visible')
    cy.get('#botonRegistro').should('be.enabled')
    cy.get('#botonRegistro').should('contain.text', 'Registrarse')
    cy.get('button.btn-secondary').should('be.visible')
    cy.get('button.btn-secondary').should('be.enabled')
    cy.get('button.btn-secondary').should('contain.text', 'Regresar')

    resetearInputs(cy)
    cy.get('#botonRegistro').click()
    cy.get('.toast-message').should('be.visible')
    cy.get('.toast-title').should('be.visible')
    cy.get('.toast-title').should('contain.text', 'Error al registrarse')
    cy.get('.toast-message').should('contain.text', 'The email address is badly')

    resetearInputs(cy)
    cy.get('#email').type('incorrecto', { delay: 100 })
    cy.get('#botonRegistro').click()
    cy.get('.toast-message').should('be.visible')
    cy.get('.toast-title').should('be.visible')
    cy.get('.toast-title').should('contain.text', 'Error al registrarse')
    cy.get('.toast-message').should('contain.text', 'The email address is badly')

    resetearInputs(cy)    
    cy.get('#email').type('prueba@prueba.com', { delay: 100 })
    cy.get('#botonRegistro').click()
    cy.get('.toast-message').should('be.visible')
    cy.get('.toast-title').should('be.visible')
    cy.get('.toast-title').should('contain.text', 'Error al registrarse')
    cy.get('.toast-message').should('contain.text', 'The password must be 6')

    resetearInputs(cy)      
    cy.get('#email').type('prueba@prueba.com', { delay: 100 })
    cy.get('#password').type('prueba2', { delay: 100 })
    cy.get('#botonRegistro').click()
    cy.get('.toast-message').should('be.visible')
    cy.get('.toast-title').should('be.visible')
    cy.get('.toast-title').should('contain.text', 'Error al registrarse')
    cy.get('.toast-message').should('contain.text', 'The email address is already')

    cy.wait(5000)
    cy.get('#botonRegresar').click()
  })
})
