const express = require('express');
const router = express.Router();
const carrinhoController = require('../controllers/carrinhoController');
const proteger = require('../middlewares/authMiddleware');

// Todas as rotas do carrinho são protegidas
router.use(proteger);

// Obter carrinho do usuário logado
router.get('/', carrinhoController.getCarrinho);

// Adicionar item ao carrinho
router.post('/', carrinhoController.adicionarItem);

// Atualizar quantidade de um item
router.put('/:produtoId', carrinhoController.atualizarItem);

// Remover item do carrinho
router.delete('/:produtoId', carrinhoController.removerItem);

// Esvaziar carrinho
router.delete('/', carrinhoController.limparCarrinho);

module.exports = router;
