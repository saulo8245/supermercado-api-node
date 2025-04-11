
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    senha: {
        type: String,
        required: true
    },
    urlImagem: {
        type: String,
        default: ''
    },
    funcao: {
        type: String,
        enum: ['usuario', 'admin', 'premium'],
        default: 'usuario'
    }
}, { timestamps: true });

// Criptografar senha antes de salvar
userSchema.pre('save', async function(next) {
    if (!this.isModified('senha')) return next();
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
});

// Método para verificar senha
userSchema.methods.compararSenha = function(senha) {
    return bcrypt.compare(senha, this.senha);
};

module.exports = mongoose.model('User', userSchema);
