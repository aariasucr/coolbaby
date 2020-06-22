// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("resetInputs", (inputs) => {
    for (var input in inputs) {
        cy.get(inputs[input]).clear()
    } 
    /*cy.get(inputs.email).clear()
    cy.get(inputs.password).clear()*/
})

Cypress.Commands.add("checkVisibleEnabled", (elements) => {
    for (var element in elements) {
        cy.get(elements[element]).should('be.visible')
        cy.get(elements[element]).should('be.enabled')
    }
})

Cypress.Commands.add("typeInputs", (inputs) => {
    for (var input in inputs) {
        cy.get(inputs[input].name).type(inputs[input].text, { delay: inputs[input].delay})
    }
})

Cypress.Commands.add("checkToastr", (elements) => {
    for (var element in elements) {
        cy.get(elements[element].name).should('be.visible')
        cy.get(elements[element].name).should('contain.text', elements[element].text)
    }
})
