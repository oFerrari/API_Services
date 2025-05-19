import express from 'express' // Importa o módulo Express (usando ES Modules)
// const express = require('express') // Alternativa com CommonJS

import { PrismaClient } from './generated/prisma/index.js'



const app = express() // Cria uma aplicação Express
app.use(express.json()) // Permite que o Express entenda JSON no corpo das requisições

// app.use(express.urlencoded({ extended: true })) // Permite que o Express entenda dados de formulários (x-www-form-urlencoded)
// app.use(express.static('public')) // Torna a pasta 'public' acessível para servir arquivos estáticos (HTML, CSS, JS, imagens)
// app.use('/api', rotaApi) // Define que todas as rotas iniciadas com '/api' serão tratadas pelo módulo de rotas 'rotaApi'
// app.use(cors()) // Habilita o CORS, permitindo requisições de outros domínios (útil para integrar com front-ends externos)

const prisma = new PrismaClient()
// const users = [] // Array em memória para armazenar usuários

// Rota POST /usuarios - Cadastra um novo usuário
app.post('/usuarios', async (req, res) => {
    await prisma.user.create({
        data: {
            email : req.body.email,
            name:req.body.name,
            age: req.body.age
        }
    })
    users.push(req.body) // Adiciona o novo usuário ao array
    res.status(201).json(req.body)
    // res.send('Criando novo usuário'); // Envia resposta simples de confirmação
    // console.log(req.body) // Mostra no terminal o corpo da requisição
})


/* // Rota GET /usuarios - Retorna a lista de usuários
app.get('/usuarios', async (require, response) => {
    //response.json(users) // Envia o array de usuários como JSON
    const users = await prisma.user.findMany()
    response.status(200).json(users)
    // response.send('OK, DEU BOM') // Enviaria uma resposta simples
    // console.log('OK, DEU BOM') // Apenas log
})
 */

app.get('/usuarios/', async(req, res) => {
    let users = []
    if(req.query){
        users = await prisma.user.findMany({
            where:{
                name: req.query.name,
                age: req.query.age ? parseInt(req.query.age) : undefined,
                email:req.query.email
            }
        })
    }else{
        users = await prisma.user.findMany()
    }
    res.status(200).json(users)
})


/*
// Rota PUT /usuarios - Atualizaria um usuário (comentada)
app.put('/usuarios', (req, res) => {
    res.send('Atualizando usuário'); // Resposta para atualização
});
*/

app.put('/usuarios/:id', async(req, res) =>{
    // console.log(req)
    const users = await prisma.user.update({
        where: {
            id: req.params.id
        },
        data:{
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }
    })
    res.status(201).json(req.body)
})


/*
// Rota DELETE /usuarios - Deletaria um usuário (comentada)
app.delete('/usuarios', (req, res) => {
    res.send('Deletando usuário'); // Resposta para exclusão
});
*/

app.delete('/usuarios/:id', async (req, res) =>{
    const users = await prisma.user.delete({
        where:{
            id: req.params.id
        },
    })
    res.status(200).json({message: 'Usuario deletado com sucesso'})
})


// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000'); // Mensagem de que o servidor está ativo
});
