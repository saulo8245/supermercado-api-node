const Joi = require('joi');

const produtoSchema = Joi.object({
  nome: Joi.string().min(2).required(),
  descricao: Joi.string().min(5).required(),
  preco: Joi.number().positive().required(),
  precoAntigo: Joi.number().positive(),
  precoComDesconto: Joi.number().min(0),
  urlImagem: Joi.string().uri().required(),
  categoria: Joi.string().length(24).required() // ID Mongo
});

module.exports = { produtoSchema };
