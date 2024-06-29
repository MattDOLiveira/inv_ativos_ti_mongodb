const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const notebookSchema = new mongoose.Schema({
    cpf: String,
    tag: String,
    modelo: String,
    n_serie: String,
    versao_so: String,
    caracteristicas: String,
    observacoes: String
});

const Notebook = mongoose.model('Notebook', notebookSchema);

function validarCPF(cpf) {
    return cpf.length === 11;
}

// Inserir ativo notebook
router.post('/', async (req, res) => {
    const { cpf, tag, modelo, n_serie, versao_so, caracteristicas, observacoes } = req.body;

    if (!validarCPF(cpf)) {
        return res.status(400).json({ message: 'CPF deve conter 11 dígitos' });
    }

    const existingNotebook = await Notebook.findOne({ cpf });
    if (existingNotebook) {
        return res.status(400).json({ message: 'Funcionario já possuí notebook' });
    }

    const notebook = new Notebook({ cpf, tag, modelo, n_serie, versao_so, caracteristicas, observacoes });
    await notebook.save();
    res.status(201).json({ message: 'Notebook inserido com sucesso' });
});

// Atualizar as informações do ativo notebook (referência = TAG)
router.put('/:tag', async (req, res) => {
    const { tag } = req.params;
    const { cpf, modelo, n_serie, versao_so, caracteristicas, observacoes } = req.body;

    const result = await Notebook.updateOne({ tag }, {
        cpf, tag, modelo, n_serie, versao_so, caracteristicas, observacoes
    });

    if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'Notebook não encontrado' });
    }

    res.status(200).json({ message: 'Notebook atualizado com sucesso' });
});

// Limpar as informações do ativo notebook (referência = TAG)
router.delete('/:tag', async (req, res) => {
    const { tag } = req.params;

    const result = await Notebook.deleteOne({ tag });
    if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Notebook não encontrado' });
    }

    res.status(200).json({ message: 'Notebook excluído com sucesso' });
});

module.exports = router;
