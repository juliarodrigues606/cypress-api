function createUser(header,body){
    return cy.api({
        method: 'POST',
        url:'/v2/users',
        headers: header,
        failOnStatusCode: false,
        body: body,
        failOnStatusCode:false
      })
}

export {createUser}