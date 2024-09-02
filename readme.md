# URLs Shortener - Express

## Apêndice

A aplicação é um encurtador de URLs que permite aos usuários registrados criar, gerenciar e monitorar links curtos personalizados. O sistema é construído com segurança em mente, utilizando autenticação JWT (JSON Web Token) para proteger o acesso aos recursos do usuário.

## Stacks

**Autenticação e Segurança:** bcrypt, jsonwebtoken, uuid

**Back-end:** Express, Node.js

**Banco de Dados:** @prisma/client, Prisma

**Documentação de API:** swagger-jsdoc, swagger-ui-express, YAML

**Qualidade de Código:** Commitizen, cz-conventional-changelog, Husky, Jest, lint-staged, nodemon, Prettier, ts-jest, ts-node, TypeScript

**Testes:** Jest, Supertest

## Funcionalidades

- **Criação de URLs Encurtadas:** Os usuários podem enviar uma URL longa e receber uma versão curta que redireciona para a URL original quando acessada.
- **Redirecionamento:** Ao acessar uma URL curta, o usuário é automaticamente redirecionado para a URL original correspondente.
- **Autenticação de Usuários:** A aplicação permite que os usuários se autentiquem utilizando um sistema de login baseado em tokens JWT (JSON Web Tokens). Usuários autenticados podem gerenciar suas URLs encurtadas.
- **Registro de Cliques:** A aplicação mantém um registro do número de vezes que cada URL curta foi acessada, permitindo o monitoramento de popularidade.
- **Documentação da API:** A aplicação inclui uma documentação da API usando Swagger para facilitar o entendimento e uso das rotas disponíveis.

## Repositório Github: https://github.com/inascimento05/urlshortener

## Swagger: https://urlshortener-ukeo.onrender.com/api-docs/

## Rodando localmente

Para iniciar o servidor de desenvolvimento, utilize o comando:

#### Instalar as dependências

```bash
npm install
```

#### Ambiente local

```bash
npm run dev
```

#### Rodar os testes

```bash
npm run test
```

## Documentação da API

A documentação Swagger da API pode ser encontrada em: base-url/api-docs/

#### Redireciona a url encurtada

```http
  GET /anchor/${id}
```

| Retorno        | Tipo     |
| :------------- | :------- |
| `URL Original` | `string` |

#### Encurta a URL

```http
  POST /shortener
```

| Body   | Tipo     | Descrição                       |
| :----- | :------- | :------------------------------ |
| `base` | `string` | **Obrigatório**. A URL Original |

#### Lista todas as URLs de um usuário

```http
  GET /url
```

| Autenticação | Tipo     |
| :----------- | :------- |
| `Bearer`     | `string` |

| Retorno                                   | Tipo    |
| :---------------------------------------- | :------ |
| `Todas as URLs associadas a esse usuário` | `URL[]` |

#### Remove uma URL

```http
  DELETE /url/${id}
```

| Autenticação | Tipo     |
| :----------- | :------- |
| `Bearer`     | `string` |

#### Atualiza uma URL

```http
  PATCH /url/${id}
```

| Autenticação | Tipo     |
| :----------- | :------- |
| `Bearer`     | `string` |

| Body   | Tipo     | Descrição                   |
| :----- | :------- | :-------------------------- |
| `base` | `string` | **Obrigatório**. A nova URL |

#### Cadastra um usuário

```http
  POST /user/signup
```

| Body       | Tipo     | Descrição                          |
| :--------- | :------- | :--------------------------------- |
| `username` | `string` | **Obrigatório**. O nome de usuário |
| `password` | `string` | **Obrigatório**. A senha           |

#### Loga um usuário

```http
  POST /user/signin
```

| Body       | Tipo     | Descrição                          |
| :--------- | :------- | :--------------------------------- |
| `username` | `string` | **Obrigatório**. O nome de usuário |
| `password` | `string` | **Obrigatório**. A senha           |

| Retorno                    | Tipo     |
| :------------------------- | :------- |
| `O Bearer Token do signin` | `string` |

## Autores

- [Ian Nascimento](https://github.com/inascimento05)
