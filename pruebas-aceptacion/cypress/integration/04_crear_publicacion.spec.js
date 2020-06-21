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

    cy.get('#email').type('test@mailinator.com')
    cy.get('#password').type('123456')
    cy.get('button.botonbonito').click()

    // Validar que si hice log in
    cy.get('.navbar-brand').should('contain.text', 'Juan Perez')
    cy.get('#navbarsExampleDefault li').should('have.length', 4)

    const postTitle = chance.sentence({words: 3})
    const postContent = chance.paragraph({sentences: 3})

    cy.get('[data-test=post-title]').type(postTitle)
    cy.get('[data-test=post-content]').type(postContent)
    cy.get('[data-test=submit-post-button').click()

    cy.get('tbody').should('contain.text', postTitle)
    cy.get('tbody').should('contain.text', postContent)

    cy.get('#navbarsExampleDefault a').contains('Logout').click()
  })
})
