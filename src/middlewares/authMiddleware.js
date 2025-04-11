const jwt = require('jsonwebtoken');
const User = require('../models/User');

const proteger = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ erro: 'Token não fornecido ou inválido.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = await User.findById(decoded.id).select('-senha');
        next();
    } catch (err) {
        return res.status(401).json({ erro: 'Token inválido ou expirado.' });
    }
};

module.exports = proteger;
