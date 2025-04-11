const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const proteger = require('../middlewares/authMiddleware');
const somenteAdmin = require('../middlewares/adminMiddleware');

// Rota pública: listar categorias
router.get('/', categoriaController.listarCategorias);

// Rotas protegidas: apenas admin pode criar, editar, deletar
router.post('/', proteger, somenteAdmin, categoriaController.criarCategoria);
router.put('/:id', proteger, somenteAdmin, categoriaController.atualizarCategoria);
router.delete('/:id', proteger, somenteAdmin, categoriaController.deletarCategoria);

module.exports = router;
