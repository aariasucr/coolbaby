/// <reference types="Cypress" />

context('Formulario de Registro', () => {
  beforeEach(() => {
    cy.visit('')
  })

  it('Revisar validaciones formulario registro', () => {
    cy.title().should('eq', 'CoolBaby')

    cy.get('a.text-primary').should('be.visible')
    cy.wait(2000)
    cy.get('a.text-primary').click()

    cy.reload()

    cy.get('div.auth-form-light > h4').should('contain.text', 'Bienvenido a COOL BABY!')

    cy.checkVisibleEnabled({
      email: '#email',
      password: '#password',
      userName: '#userName',
      fullName: '#fullName',
      btnLogin: '#botonRegistro',
      btnAnon: 'button.btn-secondary'
    })    
    cy.get('#botonRegistro').should('contain.text', 'Registrarse')
    cy.get('button.btn-secondary').should('contain.text', 'Regresar')

    cy.get('#botonRegistro').click()
    cy.checkToastr({
      title: {
        name: '.toast-title',
        text: 'Error al registrarse'
      },
      message: {
        name: '.toast-message',
        text: 'The email address is badly'
      }
    })
    
    cy.typeInputs({
      email: {
        name: '#email',
        text: 'incorrecto',
        delay: 100
      }
    })
    cy.get('#botonRegistro').click()
    cy.checkToastr({
      title: {
        name: '.toast-title',
        text: 'Error al registrarse'
      },
      message: {
        name: '.toast-message',
        text: 'The email address is badly'
      }
    })

    cy.resetInputs({
      email: '#email'
    })
    cy.typeInputs({
      email: {
        name: '#email',
        text: 'prueba@prueba.com',
        delay: 100
      }
    })
    cy.get('#botonRegistro').click()
    cy.checkToastr({
      title: {
        name: '.toast-title',
        text: 'Error al registrarse'
      },
      message: {
        name: '.toast-message',
        text: 'The password must be 6'
      }
    })

    cy.resetInputs({
      email: '#email',
      password: '#password'
    })
    cy.typeInputs({
      email: {
        name: '#email',
        text: 'prueba@prueba.com',
        delay: 100
      },
      password: {
        name: '#password',
        text: 'prueba2',
        delay: 100
      },
      userName: {
        name: '#userName',
        text: 'prueba',
        delay: 100
      },
      fullName: {
        name: '#fullName',
        text: 'Prueba Prueba',
        delay: 100
      }
    })
    cy.get('#botonRegistro').click()
    cy.checkToastr({
      title: {
        name: '.toast-title',
        text: 'Error al registrarse'
      },
      message: {
        name: '.toast-message',
        text: 'The email address is already'
      }
    })

    cy.wait(5000)
    cy.get('#botonRegresar').click()
  })
})
