const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    default: ''
  },
  preco: {
    type: Number,
    required: true
  },
  precoAntigo: {
    type: Number,
    default: 0
  },
  precoComDesconto: {
    type: Number,
    default: 0
  },
  urlImagem: {
    type: String,
    default: ''
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Produto', produtoSchema);
