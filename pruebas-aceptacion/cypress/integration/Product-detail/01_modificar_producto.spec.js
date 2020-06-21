/// <reference types="Cypress" />

/*import Chance from 'chance'
const chance = new Chance()*/

context('Modificar producto', () => {
  /*beforeEach(() => {
    cy.visit('')
  })

  it('Modificar el detalle de un producto', () => {
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

    cy.resetInputs({
      nombreProducto: '#nombreProducto',
      precioProducto: '#precioProducto'
    })
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
    cy.get('button.btn-gradient-primary').click()
    cy.checkToastr({
      title: {
        name: '.toast-title',
        text: 'Transacción exitosa'
      },
      message: {
        name: '.toast-message',
        text: 'El artículo se ha actualizado'
      }
    })

    cy.wait(5000)

    cy.get('button.col-sm-1:first').click()
    cy.get('button.btn-gradient-primary').should('be.enabled')

    cy.resetInputs({
      nombreProducto: '#nombreProducto'
    })
    cy.typeInputs({
      nombreProducto: {
        name: '#nombreProducto',
        text: 'Producto Prueba',
        delay: 100
      }
    })
    cy.get('button.btn-gradient-primary').click()
    cy.checkToastr({
      title: {
        name: '.toast-title',
        text: 'Transacción exitosa'
      },
      message: {
        name: '.toast-message',
        text: 'El artículo se ha actualizado'
      }
    })

    cy.wait(7000)
    cy.get('li.nav-logout > a.nav-link').click()
  })*/
})
