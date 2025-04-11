const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const proteger = require('../middlewares/authMiddleware');

// Rotas públicas
router.post('/registrar', userController.registrar);
router.post('/login', userController.login);

// Rota protegida de exemplo
router.get('/perfil', proteger, (req, res) => {
    res.json(req.usuario);
});

module.exports = router;
