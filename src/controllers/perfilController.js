const User = require('../models/User');
const bcrypt = require('bcrypt');

// Atualizar dados do perfil
exports.atualizarPerfil = async (req, res) => {
  try {
    const atualizacoes = req.body;

    // Impede alteração da senha por aqui
    delete atualizacoes.senha;

    const usuarioAtualizado = await User.findByIdAndUpdate(
      req.usuario._id,
      atualizacoes,
      { new: true, select: '-senha' }
    );

    res.status(200).json(usuarioAtualizado);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar perfil.' });
  }
};

// Trocar senha com validação da senha atual
exports.trocarSenha = async (req, res) => {
  try {
    const { senhaAtual, novaSenha } = req.body;

    const usuario = await User.findById(req.usuario._id);
    const senhaValida = await bcrypt.compare(senhaAtual, usuario.senha);

    if (!senhaValida) {
      return res.status(400).json({ erro: 'Senha atual incorreta.' });
    }

    const novaSenhaCriptografada = await bcrypt.hash(novaSenha, 10);
    usuario.senha = novaSenhaCriptografada;
    await usuario.save();

    res.status(200).json({ mensagem: 'Senha atualizada com sucesso.' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao trocar senha.' });
  }
};
