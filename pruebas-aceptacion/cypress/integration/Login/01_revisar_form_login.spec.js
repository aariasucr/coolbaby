/// <reference types="Cypress" />

//import * as Comun from '../comun';

context('Formulario de Login', () => {
  beforeEach(() => {
    cy.visit('')
  })

  it('Revisar validaciones formulario login', () => {
    cy.title().should('eq', 'CoolBaby')

    cy.checkVisibleEnabled({
      email: '#email',
      password: '#password',
      btnLogin: '#botonLogin',
      btnAnon: '#botonAnonimo'
    })
    cy.get('a.text-primary').should('be.visible')

    cy.typeInputs({
      email: {
        name: '#email',
        text: 'incorrecto',
        delay: 100
      },
      password: {
        name: '#password',
        text: 'incorrecto',
        delay: 100
      }
    })
    cy.get('#botonLogin').click()
    cy.checkToastr({
      title: {
        name: '.toast-title',
        text: 'Error en la autenticación'
      },
      message: {
        name: '.toast-message',
        text: 'The email address is badly'
      }
    })

    cy.resetInputs({
      email: '#email',
      password: '#password'
    })
    cy.typeInputs({
      email: {
        name: '#email',
        text: 'incorrecto@incorrecto.com',
        delay: 100
      },
      password: {
        name: '#password',
        text: 'incorrecto',
        delay: 100
      }
    })
    cy.get('#botonLogin').click()
    cy.checkToastr({
      title: {
        name: '.toast-title',
        text: 'Error en la autenticación'
      },
      message: {
        name: '.toast-message',
        text: 'There is no user record'
      }
    })

    cy.resetInputs({
      email: '#email',
      password: '#password'
    })
    cy.get('#botonLogin').click()
    cy.checkToastr({
      title: {
        name: '.toast-title',
        text: 'Error en la autenticación'
      },
      message: {
        name: '.toast-message',
        text: 'The email address is badly'
      }
    })
  })
})
