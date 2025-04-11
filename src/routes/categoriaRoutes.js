const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const proteger = require('../middlewares/authMiddleware'); // pra rotas protegidas

// Rotas públicas
router.get('/', categoriaController.listarCategorias);

// Rotas protegidas (ex: só usuários autenticados podem mexer em categorias)
router.post('/', proteger, categoriaController.criarCategoria);
router.put('/:id', proteger, categoriaController.atualizarCategoria);
router.delete('/:id', proteger, categoriaController.deletarCategoria);

module.exports = router;
