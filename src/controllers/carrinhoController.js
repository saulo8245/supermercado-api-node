const Carrinho = require('../models/Carrinho');

// Obter carrinho do usuário logado
exports.getCarrinho = async (req, res) => {
  try {
    const carrinho = await Carrinho.findOne({ usuario: req.usuario._id })
      .populate('itens.produto', 'nome preco precoComDesconto');

    if (!carrinho) {
      return res.status(200).json({ itens: [] });
    }

    res.status(200).json(carrinho);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar o carrinho.' });
  }
};

// Adicionar ou atualizar item no carrinho
exports.adicionarItem = async (req, res) => {
  try {
    const { produto, quantidade } = req.body;

    let carrinho = await Carrinho.findOne({ usuario: req.usuario._id });

    if (!carrinho) {
      carrinho = new Carrinho({
        usuario: req.usuario._id,
        itens: [{ produto, quantidade }]
      });
    } else {
      const index = carrinho.itens.findIndex(item => item.produto.toString() === produto);

      if (index !== -1) {
        // Se já existe, atualiza a quantidade
        carrinho.itens[index].quantidade += quantidade;
      } else {
        carrinho.itens.push({ produto, quantidade });
      }
    }

    await carrinho.save();
    res.status(200).json(carrinho);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao adicionar item no carrinho.' });
  }
};

// Atualizar quantidade de um item
exports.atualizarItem = async (req, res) => {
  try {
    const { produtoId } = req.params;
    const { quantidade } = req.body;

    const carrinho = await Carrinho.findOne({ usuario: req.usuario._id });
    if (!carrinho) return res.status(404).json({ erro: 'Carrinho não encontrado.' });

    const item = carrinho.itens.find(item => item.produto.toString() === produtoId);
    if (!item) return res.status(404).json({ erro: 'Produto não está no carrinho.' });

    item.quantidade = quantidade;
    await carrinho.save();

    res.status(200).json(carrinho);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar item do carrinho.' });
  }
};

// Remover item do carrinho
exports.removerItem = async (req, res) => {
  try {
    const { produtoId } = req.params;

    const carrinho = await Carrinho.findOneAndUpdate(
      { usuario: req.usuario._id },
      { $pull: { itens: { produto: produtoId } } },
      { new: true }
    );

    if (!carrinho) return res.status(404).json({ erro: 'Carrinho não encontrado.' });

    res.status(200).json(carrinho);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao remover item do carrinho.' });
  }
};

// Esvaziar o carrinho
exports.limparCarrinho = async (req, res) => {
  try {
    const carrinho = await Carrinho.findOneAndUpdate(
      { usuario: req.usuario._id },
      { itens: [] },
      { new: true }
    );

    if (!carrinho) return res.status(404).json({ erro: 'Carrinho não encontrado.' });

    res.status(200).json({ mensagem: 'Carrinho esvaziado com sucesso.', carrinho });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao limpar carrinho.' });
  }
};
