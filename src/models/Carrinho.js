const mongoose = require('mongoose');

const carrinhoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
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
  ]
}, { timestamps: true });

module.exports = mongoose.model('Carrinho', carrinhoSchema);
