const express = require('express');
const router = express.Router();
const proteger = require('../middlewares/authMiddleware');
const somenteAdmin = require('../middlewares/adminMiddleware');

const adminController = require('../controllers/adminController');

// Rota para limpar tudo
router.delete('/limpar-tudo', proteger, somenteAdmin, adminController.limparTudo);

// Rota para listar todos os usuários
router.get('/usuarios', proteger, somenteAdmin, adminController.listarUsuarios);

module.exports = router;
