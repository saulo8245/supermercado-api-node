require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Middleware para interpretar JSON
app.use(express.json());

// Rotas
const userRoutes = require('./src/routes/userRoutes');
const categoriaRoutes = require('./src/routes/categoriaRoutes');
const produtoRoutes = require('./src/routes/produtoRoutes');
const listaComprasRoutes = require('./src/routes/listaComprasRoutes');
const carrinhoRoutes = require('./src/routes/carrinhoRoutes');
const perfilRoutes = require('./src/routes/perfilRoutes');
const setupSwagger = require('./src/config/swaggerConfig');




// Uso das rotas
app.use('/api/usuarios', userRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/listas', listaComprasRoutes);
app.use('/api/carrinho', carrinhoRoutes);
app.use('/api/perfil', perfilRoutes);
setupSwagger(app);





// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado!"))
  .catch(err => console.error("Erro ao conectar ao MongoDB:", err));

// Rota de teste
app.get("/", (req, res) => {
    res.send("API do Supermercado está rodando!");
});

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
