/**
 * ============================================
 * ACESSO BANCO DE DADOS
 * ============================================
 * bdferrari
 * @#bancodedados
 */

// Inicializar serviço node.js
// node server.js  #Executa o arquivo `server.js` com o Node.js.
// node --watch server.js #Executa o arquivo `ServiceWorkerRegistration.js` com o Node.js, e **fica monitorando mudanças** nesse arquivo.


const express = require('express');
const app = express();
app.use(express.json());

// Simulando banco de dados com array
let users = [];

/**
 * ============================================
 * GET /usuarios
 * Objetivo: Listar todos os usuários
 * ============================================
 * - res.json(users) => Envia todos os usuários em JSON
 */
app.get('/usuarios', (req, res) => {
    res.json(users);
});


/**
 * ============================================
 * POST /usuarios
 * Objetivo: Cadastrar um novo usuário
 * ============================================
 * - console.log(req.body) => Ver o que chegou
 * - users.push(req.body) => Guardar no array
 * - res.send(...) => Enviar resposta
 */
app.post('/usuarios', (req, res) => {
    console.log(req.body);
    users.push(req.body);
    res.status(201).send('Usuário cadastrado!');
});


/**
 * ============================================
 * GET /usuarios/:id
 * Objetivo: Obter um único usuário por ID
 * ============================================
 * - req.params.id => Captura o parâmetro da URL
 * - res.json(...) => Envia o usuário correspondente
 */
app.get('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users[id];
    
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('Usuário não encontrado.');
    }
});


/**
 * ============================================
 * PUT /usuarios/:id
 * Objetivo: Atualizar um usuário existente (substituir tudo)
 * ============================================
 * - req.params.id => Captura o ID da URL
 * - req.body => Novos dados para substituir
 */
app.put('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (users[id]) {
        users[id] = req.body;
        res.send('Usuário atualizado com sucesso!');
    } else {
        res.status(404).send('Usuário não encontrado.');
    }
});


/**
 * ============================================
 * PATCH /usuarios/:id
 * Objetivo: Atualizar parcialmente um usuário
 * ============================================
 * - Object.assign => Atualiza somente os campos enviados
 */
app.patch('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (users[id]) {
        Object.assign(users[id], req.body);
        res.send('Usuário atualizado parcialmente!');
    } else {
        res.status(404).send('Usuário não encontrado.');
    }
});


/**
 * ============================================
 * DELETE /usuarios/:id
 * Objetivo: Remover um usuário por ID
 * ============================================
 * - users.splice => Remove do array
 */
app.delete('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (users[id]) {
        users.splice(id, 1);
        res.send('Usuário removido!');
    } else {
        res.status(404).send('Usuário não encontrado.');
    }
});


// Iniciando o servidor
app.listen(3000, () => {
    console.log('🚀 Servidor rodando em http://localhost:3000');
});




/**
 * ============================================
 * 🧾 HTTP STATUS CODES — Documentação rápida
 * ============================================
 *
 * ✅ 200 OK
 * → Quando a requisição foi bem-sucedida e há retorno.
 * Ex: res.status(200).json(dados);
 *
 * ✅ 201 Created
 * → Quando um novo recurso foi criado com sucesso.
 * Ex: res.status(201).send('Usuário criado');
 *
 * ✅ 204 No Content
 * → Quando deu certo, mas não tem conteúdo para retornar.
 * Ex: res.status(204).send();
 *
 * ⚠️ 400 Bad Request
 * → Quando o cliente enviou dados inválidos ou incompletos.
 * Ex: res.status(400).send('Erro: nome é obrigatório');
 *
 * 🔒 401 Unauthorized
 * → Quando o usuário não está autenticado (ex: sem token).
 * Ex: res.status(401).send('Token inválido ou ausente');
 *
 * ⛔ 403 Forbidden
 * → Quando está autenticado, mas não tem permissão.
 * Ex: res.status(403).send('Acesso negado');
 *
 * ❌ 404 Not Found
 * → Quando o recurso (ID, rota) não foi encontrado.
 * Ex: res.status(404).send('Usuário não encontrado');
 *
 * ⚠️ 409 Conflict
 * → Quando há conflito de dados (ex: e-mail já usado).
 * Ex: res.status(409).send('Usuário já existe');
 *
 * 💥 500 Internal Server Error
 * → Quando acontece um erro inesperado no servidor.
 * Ex: res.status(500).send('Erro interno no servidor');
 *
 * ============================================
 * 💡 Dica: Sempre use o código certo para clareza!
 * Ajuda no debug e melhora a comunicação com o front-end.
 * ============================================
 */
