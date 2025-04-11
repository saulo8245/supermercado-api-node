const Categoria = require('../models/Categoria');

// Criar nova categoria
exports.criarCategoria = async (req, res) => {
  try {
    const { nome, urlImagem } = req.body;

    const existe = await Categoria.findOne({ nome });
    if (existe) {
      return res.status(400).json({ erro: 'Categoria já existe.' });
    }

    const novaCategoria = new Categoria({ nome, urlImagem });
    await novaCategoria.save();

    res.status(201).json(novaCategoria);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar categoria.' });
  }
};

// Listar todas as categorias
exports.listarCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find().sort({ nome: 1 });
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar categorias.' });
  }
};

// Atualizar categoria
exports.atualizarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, urlImagem } = req.body;

    const categoriaAtualizada = await Categoria.findByIdAndUpdate(
      id,
      { nome, urlImagem },
      { new: true }
    );

    if (!categoriaAtualizada) {
      return res.status(404).json({ erro: 'Categoria não encontrada.' });
    }

    res.status(200).json(categoriaAtualizada);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar categoria.' });
  }
};

// Deletar categoria
exports.deletarCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const categoriaDeletada = await Categoria.findByIdAndDelete(id);

    if (!categoriaDeletada) {
      return res.status(404).json({ erro: 'Categoria não encontrada.' });
    }

    res.status(200).json({ mensagem: 'Categoria deletada com sucesso.' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar categoria.' });
  }
};
