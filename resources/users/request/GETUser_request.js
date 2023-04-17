function getAllUsers(){
    return cy.api({
        method: 'GET',
        url: '/v2/users/',
        failOnStatusCode: false,
    })
}

function getUser(header,id){
    return cy.api({
        method: 'GET',
        url: '/v2/users/'+(id),
        headers: header,
        failOnStatusCode: false,
    })
}

export {getAllUsers, getUser}