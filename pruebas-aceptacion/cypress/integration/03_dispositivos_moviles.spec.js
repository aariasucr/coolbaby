/// <reference types="Cypress" />

const checkButtons = function (cy) {
  cy.get('#email').should('be.visible')
  cy.get('#email').should('be.enabled')

  cy.get('#password').should('be.visible')
  cy.get('#password').should('be.enabled')
}

context('Dispositivos Moviles', () => {
  beforeEach(() => {
    cy.visit('')
  })

  it('Probar en Dispositivos Moviles', () => {
    cy.viewport('iphone-x')
    checkButtons(cy)
    cy.viewport('iphone-x', 'landscape')
    checkButtons(cy)
    cy.viewport('ipad-2')
    checkButtons(cy)
    cy.viewport('samsung-s10')
    checkButtons(cy)
    cy.viewport(2999, 2999)
    checkButtons(cy)
  })
})
