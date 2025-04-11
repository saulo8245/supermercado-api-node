const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const proteger = require('../middlewares/authMiddleware');
const somenteAdmin = require('../middlewares/adminMiddleware');

// Pública: listar todos
router.get('/', produtoController.listarProdutos);

// Pública: listar por categoria
router.get('/categoria/:categoriaId', produtoController.listarPorCategoria);

// Protegidas (apenas admin)
router.post('/', proteger, somenteAdmin, produtoController.criarProduto);
router.put('/:id', proteger, somenteAdmin, produtoController.atualizarProduto);
router.delete('/:id', proteger, somenteAdmin, produtoController.deletarProduto);

module.exports = router;
