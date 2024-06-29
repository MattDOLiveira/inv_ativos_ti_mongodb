const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const mouseSchema = new mongoose.Schema({
    cpf: String,
    modelo: String,
    n_serie: String,
    observacoes: String
});

const Mouse = mongoose.model('Mouse', mouseSchema);

function validarCPF(cpf) {
    return cpf.length === 11;
}

// Inserir ativo mouse
router.post('/', async (req, res) => {
    const { cpf, modelo, n_serie, observacoes } = req.body;

    if (!validarCPF(cpf)) {
        return res.status(400).json({ message: 'CPF deve conter 11 dígitos' });
    }

    const existingMouse = await Mouse.findOne({ cpf });
    if (existingMouse) {
        return res.status(400).json({ message: 'Funcionario já possuí mouse' });
    }

    const mouse = new Mouse({ cpf, modelo, n_serie, observacoes });
    await mouse.save();
    res.status(201).json({ message: 'Mouse inserido com sucesso' });
});

// Atualizar as informações do ativo mouse (referência = n_serie)
router.put('/:n_serie', async (req, res) => {
    const { n_serie } = req.params;
    const { cpf, modelo, observacoes } = req.body;

    const result = await Mouse.updateOne({ n_serie }, {
        cpf, modelo, n_serie, observacoes
    });

    if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'Mouse não encontrado' });
    }

    res.status(200).json({ message: 'Mouse atualizado com sucesso' });
});

// Limpar as informações do ativo mouse (referência = n_serie)
router.delete('/:n_serie', async (req, res) => {
    const { n_serie } = req.params;

    const result = await Mouse.deleteOne({ n_serie });
    if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Mouse não encontrado' });
    }

    res.status(200).json({ message: 'Mouse excluído com sucesso' });
});

module.exports = router;
