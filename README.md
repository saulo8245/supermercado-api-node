
# 🛒 Supermercado API

API desenvolvida com **Node.js + Express + MongoDB**, feita para servir um app mobile de supermercado (Flutter). Permite que usuários criem contas, façam login, naveguem por categorias, produtos, adicionem itens ao carrinho e criem listas de compras personalizadas.

---

## 🚀 Tecnologias

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (autenticação)
- Bcrypt (criptografia de senha)
- Swagger (documentação)
- Dotenv (variáveis de ambiente)

---

## 📁 Estrutura de pastas

```bash
supermercado-api/
│
├── src/
│   ├── config/           # Configurações gerais (MongoDB, Swagger)
│   ├── controllers/      # Lógica dos endpoints
│   ├── docs/             # Documentação Swagger (swagger.yaml)
│   ├── middlewares/      # Middlewares customizados (auth, erros)
│   ├── models/           # Schemas Mongoose
│   ├── routes/           # Rotas organizadas por recurso
│   └── services/         # (Opcional) Lógicas de negócio
│
├── .env                  # Variáveis de ambiente
├── .gitignore            # Ignora node_modules, .env etc
├── server.js             # Entrypoint principal
├── package.json
└── README.md
```

---

## 🔐 Autenticação

A API usa **JWT**. Para acessar rotas protegidas, envie o token no header:

```
Authorization: Bearer SEU_TOKEN
```

---

## 🧪 Testes

Você pode testar todos os endpoints localmente via:

📍 `http://localhost:3000/api`

📘 Documentação interativa via Swagger:

📍 `https://supermercado-api-node.onrender.com/api-docs/#/`

---

## 📦 Instalação local

```bash
git clone https://github.com/seunome/supermercado-api.git
cd supermercado-api
npm install
npm run dev
```

---

## 🧠 Endpoints principais

- `/api/usuarios` — registrar e login
- `/api/perfil` — atualizar dados e senha
- `/api/categorias` — categorias de produtos
- `/api/produtos` — produtos do supermercado
- `/api/listas` — listas de compras
- `/api/carrinho` — carrinho de compras
- `/api-docs` — Swagger (documentação)

---

## 📝 Licença

Este projeto é open-source, disponível sob a licença MIT.

---

## 👨‍💻 Autor

Desenvolvido por Saulo Barbosa de Oliveira — projeto de portfólio 💼
Readme realizado com ajuda de IA