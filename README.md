# API Services

API de estudo para cadastro de usuários, desenvolvida com Node.js, Express 5, Prisma 6 e MongoDB.

## Funcionalidades

- Criar, listar, atualizar e excluir usuários.
- Filtrar a listagem por nome, e-mail ou idade.
- Persistir os dados no MongoDB usando Prisma.

## Executar localmente

Use Node.js 22 ou superior e uma instância MongoDB com suporte a replica set (por exemplo, MongoDB Atlas).

1. Instale as dependências com `npm ci`.
2. Crie um arquivo `.env` na raiz e defina `DATABASE_URL` com a conexão da sua própria instância MongoDB. Não publique credenciais.
3. Gere o cliente com `npx prisma generate`.
4. Em uma base de desenvolvimento, sincronize o schema com `npx prisma db push`.
5. Inicie com `node server.js`.

A API fica disponível em `http://localhost:3000`.

## Rotas

| Método | Rota | Finalidade |
| --- | --- | --- |
| POST | `/usuarios` | Criar usuário |
| GET | `/usuarios` | Listar ou filtrar usuários |
| PUT | `/usuarios/:id` | Atualizar usuário |
| DELETE | `/usuarios/:id` | Excluir usuário |

Exemplo de corpo para criação:

```json
{
  "name": "Pessoa de exemplo",
  "email": "pessoa@example.com",
  "age": 25
}
```

A criação retorna o registro persistido, incluindo o identificador gerado pelo banco.
A consulta aceita parâmetros como `/usuarios?name=Pessoa&age=25`.

## Estrutura

- `server.js`: servidor e rotas.
- `prisma/schema.prisma`: modelo User e configuração do banco.
- `generated/prisma`: cliente gerado por Prisma.
- `documentacaoServer.js`: exemplos e anotações de estudo.

## Limitações atuais

Este é um projeto de aprendizado. Ainda não implementa autenticação, autorização, validação completa de entrada ou testes de integração com MongoDB. Não exponha a API publicamente com dados reais sem adicionar essas proteções.

`node_modules` e `.env` devem permanecer fora do versionamento.
