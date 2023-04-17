import header from '../fixtures/headers_request/add_user.json'
import * as user from '../../resources/users/payload/add_user'

//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//

Cypress.Commands.add('createUser', () => { 
    cy.api({
      method: 'POST',
      url:'v2/users',
      headers: header,
      failOnStatusCode: false,
      body: user.user(),
      failOnStatusCode:false
    })
})


//

// should(({status,body})=>{
//     expect(status).to.eq(201)
//     expect(body.name).to.eq(dataUser.name)
//     expect(body.email).to.eq(dataUser.email)
//     expect(body.gender).to.eq(dataUser.gender)
//     expect(body.status).to.eq(dataUser.status)

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })