const mongoose = require('mongoose');

const listaComprasSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  itens: [
    {
      produto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produto',
        required: true
      },
      quantidade: {
        type: Number,
        default: 1
      }
    }
  ],
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('ListaCompras', listaComprasSchema);
