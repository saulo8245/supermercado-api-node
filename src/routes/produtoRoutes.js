const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const proteger = require('../middlewares/authMiddleware');

// Rotas públicas
router.get('/', produtoController.listarProdutos);
router.get('/categoria/:categoriaId', produtoController.listarPorCategoria);

// Rotas protegidas (para admins ou usuários autenticados)
router.post('/', proteger, produtoController.criarProduto);
router.put('/:id', proteger, produtoController.atualizarProduto);
router.delete('/:id', proteger, produtoController.deletarProduto);

module.exports = router;
