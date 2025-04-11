
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Gerar token
const gerarToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Registrar novo usuário
exports.registrar = async (req, res) => {
    try {
        const { nome, email, senha, urlImagem, funcao } = req.body;

        const existeUsuario = await User.findOne({ email });
        if (existeUsuario) {
            return res.status(400).json({ erro: 'Email já está em uso.' });
        }

        const novoUsuario = new User({ nome, email, senha, urlImagem, funcao });
        await novoUsuario.save();

        const token = gerarToken(novoUsuario._id);
        res.status(201).json({ usuario: novoUsuario, token });

    } catch (error) {
        res.status(500).json({ erro: 'Erro ao registrar usuário.' });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ erro: 'Email ou senha inválidos.' });
        }

        const senhaValida = await usuario.compararSenha(senha);
        if (!senhaValida) {
            return res.status(400).json({ erro: 'Email ou senha inválidos.' });
        }

        const token = gerarToken(usuario._id);
        res.status(200).json({ usuario, token });

    } catch (error) {
        res.status(500).json({ erro: 'Erro ao fazer login.' });
    }
};
