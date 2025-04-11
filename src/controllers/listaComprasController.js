const ListaCompras = require('../models/ListaCompras');

// Criar nova lista de compras
exports.criarLista = async (req, res) => {
  try {
    const { nome, itens } = req.body;

    const novaLista = new ListaCompras({
      nome,
      itens,
      usuario: req.usuario._id
    });

    await novaLista.save();
    res.status(201).json(novaLista);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar lista de compras.' });
  }
};

// Listar todas as listas do usuário
exports.listarListas = async (req, res) => {
  try {
    const listas = await ListaCompras.find({ usuario: req.usuario._id })
      .populate('itens.produto', 'nome preco precoComDesconto');

    res.status(200).json(listas);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar listas de compras.' });
  }
};

// Atualizar uma lista
exports.atualizarLista = async (req, res) => {
  try {
    const { id } = req.params;
    const atualizacao = req.body;

    const lista = await ListaCompras.findOneAndUpdate(
      { _id: id, usuario: req.usuario._id },
      atualizacao,
      { new: true }
    );

    if (!lista) {
      return res.status(404).json({ erro: 'Lista não encontrada.' });
    }

    res.status(200).json(lista);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar lista de compras.' });
  }
};

// Deletar uma lista
exports.deletarLista = async (req, res) => {
  try {
    const { id } = req.params;

    const lista = await ListaCompras.findOneAndDelete({ _id: id, usuario: req.usuario._id });

    if (!lista) {
      return res.status(404).json({ erro: 'Lista não encontrada.' });
    }

    res.status(200).json({ mensagem: 'Lista deletada com sucesso.' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar lista de compras.' });
  }
};
