/// <reference types="Cypress" />

import Chance from 'chance'
const chance = new Chance()

context('Crear publicacion', () => {
  beforeEach(() => {
    cy.visit('')
  })

  it('Hacer login y crear publicacion', () => {
    cy.get('#email').should('be.visible')
    cy.get('#email').should('be.enabled')

    cy.get('#password').should('be.visible')
    cy.get('#password').should('be.enabled')

    cy.get('#email').type('prueba@prueba.com', { delay: 100 })
    cy.get('#password').type('prueba1234', { delay: 100 })
    cy.get('#botonLogin').click()
    cy.get('div.nav-profile-text > a > p.text-black').should('contain.text', 'usuarioPrueba')
    cy.get('#botonProductos').click({ force: true })

    const nombreProducto = chance.word({ length: 5 })
    const precio = chance.integer({ min: 0, max: 100000})

    cy.get('#nombreProducto').type(nombreProducto, { delay: 100 })
    cy.get('#precioProducto').type(precio, { delay: 100 })
    cy.get('#tallaProducto').select('Mediano').should('have.value', 'M')
    cy.get('#categoriaProducto').select('Todo').should('have.value', '3')

    cy.get('#botonAgregarProducto').click()
    cy.get('.toast-message').should('be.visible')
    cy.get('.toast-title').should('be.visible')
    cy.get('.toast-title').should('contain.text', 'Transacción exitosa')
    cy.get('.toast-message').should('contain.text', 'El producto se ha agregado')
    cy.get('[data-test-productos=test-tabla-productos] tbody tr td label a').should('contain.text', nombreProducto)
    cy.get('[data-test-productos=test-tabla-productos] tbody tr td').should('contain.text', precio)

    cy.wait(7000)
    cy.get('li.nav-logout > a.nav-link').click()
  })
})
