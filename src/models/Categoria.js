
const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        unique: true
    },
    urlImagem: {
        type: String,
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('Categoria', categoriaSchema);
