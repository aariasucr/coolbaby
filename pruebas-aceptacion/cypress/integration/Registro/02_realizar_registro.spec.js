/// <reference types="Cypress" />

context('Formulario de Registro', () => {
  beforeEach(() => {
    cy.visit('')
  })

  it('Realizar registro de un usuario', () => {
    cy.title().should('eq', 'CoolBaby')

    cy.get('a.text-primary').should('be.visible')
    cy.wait(2000)
    cy.get('a.text-primary').click()

    cy.reload()

    cy.get('div.auth-form-light > h4').should('contain.text', 'Bienvenido a COOL BABY!')

    cy.get('#email').type('prueba2@prueba2.com', { delay: 100 })
    cy.get('#password').type('prueba2', { delay: 100 })
    cy.get('#userName').type('prueba2', { delay: 100 })
    cy.get('#fullName').type('Prueba Numero 2', { delay: 100 })
    cy.get('#botonRegistro').click()
    cy.get('.toast-title').should('contain.text', 'Registro completo')
    cy.get('.toast-message').should('contain.text', 'Se ha creado el usuario')

    cy.get('div.nav-profile-text > a > p.text-black').should('contain.text', 'prueba2')

    cy.wait(7000)
    cy.get('li.nav-logout > a.nav-link').click()
  })
})
