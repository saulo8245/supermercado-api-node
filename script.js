// script.js
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Conectado ao MongoDB');

    await mongoose.connection.db.dropDatabase(); // ⚠️ CUIDADO: apaga o banco inteiro

    console.log('Banco de dados apagado!');
    mongoose.disconnect();
  })
  .catch(err => console.error('Erro:', err));
