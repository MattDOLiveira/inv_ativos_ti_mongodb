const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const desktopSchema = new mongoose.Schema({
    cpf: String,
    modelo: String,
    tag: String,
    n_serie: String,
    versao: String,
    caracteristicas: String,
    observacoes: String
});

const Desktop = mongoose.model('Desktop', desktopSchema);

function validarCPF(cpf) {
    return cpf.length === 11;
}

// Inserir ativo desktop
router.post('/', async (req, res) => {
    const { cpf, modelo, tag, n_serie, versao, caracteristicas, observacoes } = req.body;

    if (!validarCPF(cpf)) {
        return res.status(400).json({ message: 'CPF deve conter 11 dígitos' });
    }

    const existingDesktop = await Desktop.findOne({ cpf });
    if (existingDesktop) {
        return res.status(400).json({ message: 'Funcionario já possuí desktop' });
    }

    const desktop = new Desktop({ cpf, modelo, tag, n_serie, versao, caracteristicas, observacoes });
    await desktop.save();
    res.status(201).json({ message: 'Desktop inserido com sucesso' });
});

// Atualizar as informações do ativo desktop (referência = TAG)
router.put('/:tag', async (req, res) => {
    const { tag } = req.params;
    const { cpf, modelo, n_serie, versao, caracteristicas, observacoes } = req.body;

    const result = await Desktop.updateOne({ tag }, {
        cpf, modelo, tag, n_serie, versao, caracteristicas, observacoes
    });

    if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'Desktop não encontrado' });
    }

    res.status(200).json({ message: 'Desktop atualizado com sucesso' });
});

// Limpar as informações do ativo desktop (referência = TAG)
router.delete('/:tag', async (req, res) => {
    const { tag } = req.params;

    const result = await Desktop.deleteOne({ tag });
    if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Desktop não encontrado' });
    }

    res.status(200).json({ message: 'Desktop excluído com sucesso' });
});

module.exports = router;
