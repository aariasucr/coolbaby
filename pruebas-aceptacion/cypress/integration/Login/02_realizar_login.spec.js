/// <reference types="Cypress" />

context('Login y Logout', () => {
  beforeEach(() => {
    cy.visit('')
  })

  it('Hacer login', () => {
    cy.title().should('eq', 'CoolBaby')

    cy.checkVisibleEnabled({
      email: '#email',
      password: '#password',
      btnLogin: '#botonLogin',
      btnAnon: '#botonAnonimo'
    })
    
    cy.typeInputs({
      email: {
        name: '#email',
        text: 'prueba@prueba.com',
        delay: 100
      },
      password: {
        name: '#password',
        text: 'prueba1234',
        delay: 100
      }
    })
    cy.get('#botonLogin').click()
    cy.checkToastr({
      title: {
        name: '.toast-title',
        text: 'Bienvenido a Cool Baby'
      },
      message: {
        name: '.toast-message',
        text: 'Ha iniciado sesión'
      }
    })
    cy.get('div.nav-profile-text > a > p.text-black').should('contain.text', 'usuarioPrueba')

    cy.wait(7000)
    cy.get('li.nav-logout > a.nav-link').click()
  })
})
