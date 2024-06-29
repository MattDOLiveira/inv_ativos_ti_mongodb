const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const tecladoSchema = new mongoose.Schema({
    cpf: String,
    modelo: String,
    n_serie: String,
    observacoes: String
});

const Teclado = mongoose.model('Teclado', tecladoSchema);

function validarCPF(cpf) {
    return cpf.length === 11;
}

// Inserir ativo teclado
router.post('/', async (req, res) => {
    const { cpf, modelo, n_serie, observacoes } = req.body;

    if (!validarCPF(cpf)) {
        return res.status(400).json({ message: 'CPF deve conter 11 dígitos' });
    }

    const existingTeclado = await Teclado.findOne({ cpf });
    if (existingTeclado) {
        return res.status(400).json({ message: 'Funcionario já possuí teclado' });
    }

    const teclado = new Teclado({ cpf, modelo, n_serie, observacoes });
    await teclado.save();
    res.status(201).json({ message: 'Teclado inserido com sucesso' });
});

// Atualizar as informações do ativo teclado (referência = n_serie)
router.put('/:n_serie', async (req, res) => {
    const { n_serie } = req.params;
    const { cpf, modelo, observacoes } = req.body;

    const result = await Teclado.updateOne({ n_serie }, {
        cpf, modelo, n_serie, observacoes
    });

    if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'Teclado não encontrado' });
    }

    res.status(200).json({ message: 'Teclado atualizado com sucesso' });
});

// Limpar as informações do ativo teclado (referência = n_serie)
router.delete('/:n_serie', async (req, res) => {
    const { n_serie } = req.params;

    const result = await Teclado.deleteOne({ n_serie });
    if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Teclado não encontrado' });
    }

    res.status(200).json({ message: 'Teclado excluído com sucesso' });
});

module.exports = router;
