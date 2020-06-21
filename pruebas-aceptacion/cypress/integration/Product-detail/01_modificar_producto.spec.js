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
    cy.get('[data-test-productos=test-tabla-productos] > tbody > tr > td > label > a:first').click()

    cy.get('.img-articulo').should('have.attr', 'src', 'https://naibuzz.com/wp-content/uploads/2015/06/are-you-serious-wtf-meme-baby-face.jpg')

    cy.get('button.col-sm-1').click({ multiple: true })
    cy.get('#nombreProducto').should('be.enabled')
    cy.get('#precioProducto').should('be.enabled')
    cy.get('#tallaProducto').should('be.enabled')
    cy.get('#categoriaProducto').should('be.enabled')
    cy.get('button.btn-gradient-primary').should('be.enabled')

    const nombreProducto = chance.word({ length: 5 })
    const precio = chance.integer({ min: 0, max: 100000})

    cy.get('#nombreProducto').clear()
    cy.get('#precioProducto').clear()

    cy.get('#nombreProducto').type(nombreProducto, { delay: 100 })
    cy.get('#precioProducto').type(precio, { delay: 100 })
    cy.get('#tallaProducto').select('Mediano').should('have.value', 'M')
    cy.get('#categoriaProducto').select('Todo').should('have.value', '3')

    cy.get('button.btn-gradient-primary').click()
    cy.get('.toast-message').should('be.visible')
    cy.get('.toast-title').should('be.visible')
    cy.get('.toast-title').should('contain.text', 'Transacción exitosa')
    cy.get('.toast-message').should('contain.text', 'El artículo se ha actualizado')

    cy.wait(7000)

    cy.get('button.col-sm-1:first').click()
    cy.get('button.btn-gradient-primary').should('be.enabled')

    cy.get('#nombreProducto').clear()
    cy.get('#nombreProducto').type('Producto Prueba', { delay: 100 })
    cy.get('button.btn-gradient-primary').click()
    cy.get('.toast-message').should('be.visible')
    cy.get('.toast-title').should('be.visible')
    cy.get('.toast-title').should('contain.text', 'Transacción exitosa')
    cy.get('.toast-message').should('contain.text', 'El artículo se ha actualizado')

    cy.wait(7000)
    cy.get('li.nav-logout > a.nav-link').click()
  })
})
