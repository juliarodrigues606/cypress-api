import  { faker } from '@faker-js/faker'

function user() {
    const DADOS_USUARIO= {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        gender: pickGender(),
        status: pickStatus()
    }
    return DADOS_USUARIO
}

function pickGender () {
    const genders = ['female','male']
    let gender= genders[(Math.random()*genders.length)|0]
    return gender
}

function pickStatus () {
    const listStatus = ['active','inactive']
    let status= listStatus[(Math.random()*listStatus.length)|0]
    return status
}

export {user}