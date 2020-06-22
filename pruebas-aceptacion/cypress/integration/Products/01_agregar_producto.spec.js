/// <reference types="Cypress" />

import Chance from 'chance'
const chance = new Chance()

context('Agregar producto', () => {
  beforeEach(() => {
    cy.visit('')
  })

  it('Hacer login y agregar un nuevo producto', () => {
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
    cy.get('div.nav-profile-text > a > p.text-black').should('contain.text', 'usuarioPrueba')
    cy.get('#botonProductos').click({ force: true })

    const nombreProducto = chance.word({ length: 5 })
    const precio = chance.integer({ min: 0, max: 100000})
    cy.typeInputs({
      nombreProducto: {
        name: '#nombreProducto',
        text: nombreProducto,
        delay: 100
      },
      precioProducto: {
        name: '#precioProducto',
        text: precio,
        delay: 100
      }
    })
    cy.get('#tallaProducto').select('Mediano').should('have.value', 'M')
    cy.get('#categoriaProducto').select('Todo').should('have.value', '3')
    cy.get('#botonAgregarProducto').click()
    cy.checkToastr({
      title: {
        name: '.toast-title',
        text: 'Transacción exitosa'
      },
      message: {
        name: '.toast-message',
        text: 'El producto se ha agregado'
      }
    })
    cy.get('[data-test-productos=test-tabla-productos] tbody tr td label a').should('contain.text', nombreProducto)
    cy.get('[data-test-productos=test-tabla-productos] tbody tr td').should('contain.text', precio)

    cy.wait(7000)
    cy.get('li.nav-logout > a.nav-link').click()
  })
})
