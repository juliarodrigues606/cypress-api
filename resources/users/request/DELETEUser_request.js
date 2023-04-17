
function deleteUser(header,id){
    return cy.api({
        method: 'DELETE',
        url: '/v2/users/'+(id),
        headers: header,
        failOnStatusCode: false,
    })
}

export {deleteUser}