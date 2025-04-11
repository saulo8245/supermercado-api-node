module.exports = (req, res, next) => {
    if (req.usuario.funcao !== 'admin') {
      return res.status(403).json({ erro: 'Acesso negado. Requer permissões de administrador.' });
    }
    next();
  };
  