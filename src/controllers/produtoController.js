const Produto = require('../models/Produto');
const Categoria = require('../models/Categoria');
const mongoose = require('mongoose');


// Criar novo produto
exports.criarProduto = async (req, res) => {
  try {
    const {
      nome,
      descricao,
      preco,
      precoAntigo,
      precoComDesconto,
      urlImagem,
      categoria
    } = req.body;

    // ✅ Verifica se a categoria existe
    const categoriaExiste = await Categoria.findById(categoria);
    if (!categoriaExiste) {
      return res.status(400).json({ erro: 'Categoria inválida ou inexistente.' });
    }

    const novoProduto = new Produto({
      nome,
      descricao,
      preco,
      precoAntigo: precoAntigo || preco,
      precoComDesconto: precoComDesconto || 0,
      urlImagem,
      categoria
    });

    await novoProduto.save();
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar produto.' });
  }
};


// Listar todos os produtos
exports.listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find().populate('categoria', 'nome');
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar produtos.' });
  }
};

// Listar produtos por categoria
exports.listarPorCategoria = async (req, res) => {
  try {
    const { categoriaId } = req.params;
    const produtos = await Produto.find({ categoria: categoriaId }).populate('categoria', 'nome');
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar produtos por categoria.' });
  }
};

// Atualizar produto
exports.atualizarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const atualizacao = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ erro: 'ID inválido.' });
    }

    const produtoAtualizado = await Produto.findByIdAndUpdate(id, atualizacao, { new: true });

    if (!produtoAtualizado) {
      return res.status(404).json({ erro: 'Produto não encontrado.' });
    }

    res.status(200).json(produtoAtualizado);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar produto.' });
  }
};

// Deletar produto
exports.deletarProduto = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ erro: 'ID inválido.' });
    }

    const produto = await Produto.findByIdAndDelete(id);

    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado.' });
    }

    res.status(200).json({ mensagem: 'Produto deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar produto.' });
  }
};
