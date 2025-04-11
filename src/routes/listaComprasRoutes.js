const express = require('express');
const router = express.Router();
const listaController = require('../controllers/listaComprasController');
const proteger = require('../middlewares/authMiddleware');

// Todas as rotas são protegidas (ligadas ao usuário logado)
router.use(proteger);

// Criar lista
router.post('/', listaController.criarLista);

// Listar todas as listas do usuário
router.get('/', listaController.listarListas);

// Atualizar lista
router.put('/:id', listaController.atualizarLista);

// Deletar lista
router.delete('/:id', listaController.deletarLista);

module.exports = router;
