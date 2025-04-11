const express = require('express');
const router = express.Router();
const perfilController = require('../controllers/perfilController');
const proteger = require('../middlewares/authMiddleware');

// Todas as rotas do perfil são protegidas
router.use(proteger);

// Atualizar nome, email, imagem...
router.put('/', perfilController.atualizarPerfil);

// Trocar senha com senha atual
router.put('/senha', perfilController.trocarSenha);

module.exports = router;
