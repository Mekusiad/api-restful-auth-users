# Desafio 02 - Escribo

- Desenvolver uma API RESTful para autenticação de usuários, que permita operações de cadastro (sign up), autenticação (sign in) e recuperação de informações do usuário.

## Instalação

Abra seu terminal e clone o repositório com o seguinte comando

`$ git clone git@github.com:Mekusiad/api-restful-auth-users.git`

Após isso, instale as dependênias

`$ npm install`

### EndPoints

- /signUp
- /signIn
- /getUser

### JavaScript

Estrutura para /signUp

```javascript
{
"name":"name",
"email": "name@name.com",
"password":"password",
"phone":{"number":"123456", "ddd":"91"}
}
```

Estrutura para /signIn

```javascript
{
 "email": "email@email.com",
 "password":"password",
}
```

##### Banco de dados

- Foi utilizado o mongoDB para guardar usuários
