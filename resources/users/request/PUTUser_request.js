function updateUser(id,header,body){
    return cy.api({
        method: 'PUT',
        url:'/v2/users/'+id,
        headers: header,
        failOnStatusCode: false,
        body: body,
        failOnStatusCode:false
      })
}

export {updateUser}