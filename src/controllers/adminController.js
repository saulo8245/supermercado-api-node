const Produto = require('../models/Produto');
const Categoria = require('../models/Categoria');
const ListaCompras = require('../models/ListaCompras');
const Carrinho = require('../models/Carrinho');
const User = require('../models/User');

// Limpar todo o banco
exports.limparTudo = async (req, res) => {
  try {
    await Produto.deleteMany({});
    await Categoria.deleteMany({});
    await ListaCompras.deleteMany({});
    await Carrinho.deleteMany({});
    await User.deleteMany({});

    res.status(200).json({ mensagem: 'TODOS os dados foram apagados com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao limpar banco de dados.' });
  }
};

// Listar todos os usuários
exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find().select('-senha');
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar usuários.' });
  }
};
