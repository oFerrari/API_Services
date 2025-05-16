import express from 'express' // Importa o módulo Express (usando ES Modules)
// const express = require('express') // Alternativa com CommonJS

const app = express() // Cria uma aplicação Express
app.use(express.json()) // Permite que o Express entenda JSON no corpo das requisições

// app.use(express.urlencoded({ extended: true })) // Permite que o Express entenda dados de formulários (x-www-form-urlencoded)
// app.use(express.static('public')) // Torna a pasta 'public' acessível para servir arquivos estáticos (HTML, CSS, JS, imagens)
// app.use('/api', rotaApi) // Define que todas as rotas iniciadas com '/api' serão tratadas pelo módulo de rotas 'rotaApi'
// app.use(cors()) // Habilita o CORS, permitindo requisições de outros domínios (útil para integrar com front-ends externos)

const users = [] // Array em memória para armazenar usuários

// Rota GET /usuarios - Retorna a lista de usuários
app.get('/usuarios', (require, response) => {
    //response.json(users) // Envia o array de usuários como JSON
    response.status(200).json(users)
    // response.send('OK, DEU BOM') // Enviaria uma resposta simples
    // console.log('OK, DEU BOM') // Apenas log
})

// Rota POST /usuarios - Cadastra um novo usuário
app.post('/usuarios', (req, res) => {
    users.push(req.body) // Adiciona o novo usuário ao array
    res.status(201).json(req.body)
    // res.send('Criando novo usuário'); // Envia resposta simples de confirmação
    // console.log(req.body) // Mostra no terminal o corpo da requisição
})

/*
// Rota PUT /usuarios - Atualizaria um usuário (comentada)
app.put('/usuarios', (req, res) => {
    res.send('Atualizando usuário'); // Resposta para atualização
});
*/

/*
// Rota DELETE /usuarios - Deletaria um usuário (comentada)
app.delete('/usuarios', (req, res) => {
    res.send('Deletando usuário'); // Resposta para exclusão
});
*/

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000'); // Mensagem de que o servidor está ativo
});
