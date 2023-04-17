import 'cypress-plugin-api' //importação do plugin para apresentação do teste no browser
import header from '../../fixtures/headers_request/add_user.json'
import * as user from '../../../resources/users/payload/add_user' 
import * as GET from '../../../resources/users/request/GETUser_request'
import * as POST from '../../../resources/users/request/POSTUser_request'
import * as PUT from '../../../resources/users/request/PUTUser_request'
import * as DELETE from '../../../resources/users/request/DELETEUser_request'


describe('suíte de testes da API https://gorest.co.in/public/v2/users', () => {
  let userP  //Criando variavel para salvar meu usuário de teste 

  before(()=>{
    cy.createUser().then(data => { //criando meu usuario de teste 
    userP= data.body // salvando os dados do usuário de teste
    })
  })

  it('Deve consultar os usuarios cadastrado ao reatizar requisção GET na API sem paramentros', () => {
    GET.getAllUsers()
    .should(({status})=>{
      expect(status).eq(200) //validando status code da consulta
    })
  }) 

  it('Deve consultar o usuário que foi enviado o ID na requisição GET',()=>{
    GET.getUser(header,userP.id) //fazendo a consulta 
    .should(({status , body}) => { //validar response da consulta 
      expect(status).eq(200)
      expect(body.id).eq(userP.id) 
      expect(body.name).eq(userP.name)
      expect(body.email).eq(userP.email)
      expect(body.gender).eq(userP.gender)
    })
  })

  it('Deve gerar um usuário após enviar dados validos na requisição POST',()=>{
    const body_request = user.user() //gerando dados aleatorios para o usuario 
    POST.createUser(header,body_request) // enviando requisição para criar usuário 
    .should(({status,body})=>{ //validando response da requisição 
      expect(status).eq(201)
      expect(body.name).eq(body_request.name)
      expect(body.email).eq(body_request.email)
      expect(body.gender).eq(body_request.gender)
      expect(body.status).eq(body_request.status)
    })
  })

  it('Não deve gerar usuario caso o e-mail já esteja cadastrado',()=>{
    let body_request = user.user() //gerando dados aleatorios para o usuario 
    body_request.email=userP.email //setando valor do email com o valor do email pertencente ao meu usuario de teste cadastrado no before 
    
    POST.createUser(header,body_request)
    .then((data)=>{ // fazendo validação do response de erro 
      expect(data.status).eq(422) 
      let responseBody = data.body //pegando body do response se erro para validar se o erro esperado é um dos retornados 
      let errorFound = false //variavel para verificar se encontrou o erro que eu estava esperando 
      responseBody.forEach(error => { //percorrendo o array de erros que a aplicação pode retornar 
        if (error.field == 'email'){ //verifica se no atributo field possui o campo esperado se sim:
          expect(error.message).equal('has already been taken') //verifica se é a mensagem esperada 
          errorFound = true //e diz que encontrou erro no campo esperado 
        }
      })
      expect(errorFound).eq(true) //aqui como o teste ele verifica se o campo email possui o erro , a variavel errorFound deve estar como true , caso não meu teste falhou por não encontrar meu erro 
    })
  })

  it('Deve realizar update do usuário após enviar dados validos na requisição PUT',()=>{
    const body_request = user.user()
    cy.createUser().then(data => {
      let userToUpdate= data.body
      PUT.updateUser(userToUpdate.id,header,body_request) //realiza a requisição
      .should(({status,body})=>{ //valida response
        expect(status).eq(200)
        expect(body.id).eq(userToUpdate.id)
        expect(body.name).eq(body_request.name)
        expect(body.email).eq(body_request.email)
        expect(body.gender).eq(body_request.gender)
        expect(body.status).eq(body_request.status)

        expect(body.name).to.not.eq(userToUpdate.name) //valida se o campo nome foi alterado realmente 
        expect(body.email).to.not.eq(userToUpdate.email) //valida se o campo email foi alterado realmente 
      
      })
    })
  })

  it('Não deve realizar update do usuário quando enviar na requisição PUT com nome vazio',()=>{
    const body_request = user.user()
    body_request.name = '' //envia valor vazio no nome 
    cy.createUser().then(data => {
      let userToUpdate= data.body
      PUT.updateUser(userToUpdate.id,header,body_request) //realiza a requisição
      .then((data)=>{ //valida response
        expect(data.status).eq(422)
        let responseBody = data.body
        let errorFound = false
        responseBody.forEach(error => {
          if (error.field == 'name'){
            expect(error.message).equal('can\'t be blank')
            errorFound = true
          }
        })
        expect(errorFound).eq(true)
      })
    })
  })

  it('Não deve realizar update do usuário quando enviar na requisição PUT email já cadastrado',()=>{
    const body_request = user.user()
    body_request.email = userP.email //envia e-mail ja cadastrado para o body da requisição 
    cy.createUser().then(data => {
      let userToUpdate= data.body
      PUT.updateUser(userToUpdate.id,header,body_request) //realiza requisição
      .then((data)=>{ //valida response da requisição 
        expect(data.status).eq(422)
        let responseBody = data.body
        let errorFound = false
        responseBody.forEach(error => {
          if (error.field == 'email'){
            expect(error.message).equal('has already been taken')
            errorFound = true
          }
        })
        expect(errorFound).eq(true)
      })
    })
  })

  it('Deve excluir o usuário que foi enviado o ID na requisição DELETE',()=>{
    DELETE.deleteUser(header,userP.id)
    .should(({status,statusText}) => {
      expect(status).eq(204)
      expect(statusText).eq('No Content')
    })
  })

})