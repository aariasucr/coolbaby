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

    cy.typeInputs({
      email: {
        name: '#email',
        text: 'prueba2@prueba2.com',
        delay: 100
      },
      password: {
        name: '#password',
        text: 'prueba2',
        delay: 100
      },
      userName: {
        name: '#userName',
        text: 'prueba2',
        delay: 100
      },
      fullName: {
        name: '#fullName',
        text: 'Prueba Numero 2',
        delay: 100
      }
    })
    cy.get('#botonRegistro').click()
    cy.checkToastr({
      title: {
        name: '.toast-title',
        text: 'Registro completo'
      },
      message: {
        name: '.toast-message',
        text: 'Se ha creado el usuario'
      }
    })

    cy.get('div.nav-profile-text > a > p.text-black').should('contain.text', 'prueba2')

    cy.wait(7000)
    cy.get('li.nav-logout > a.nav-link').click()
  })
})
