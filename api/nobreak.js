const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const nobreakSchema = new mongoose.Schema({
    cpf: String,
    modelo: String,
    n_serie: String,
    observacoes: String
});

const Nobreak = mongoose.model('Nobreak', nobreakSchema);

function validarCPF(cpf) {
    return cpf.length === 11;
}

// Inserir ativo nobreak
router.post('/', async (req, res) => {
    const { cpf, modelo, n_serie, observacoes } = req.body;

    if (!validarCPF(cpf)) {
        return res.status(400).json({ message: 'CPF deve conter 11 dígitos' });
    }

    const existingNobreak = await Nobreak.findOne({ cpf });
    if (existingNobreak) {
        return res.status(400).json({ message: 'Funcionario já possuí nobreak' });
    }

    const nobreak = new Nobreak({ cpf, modelo, n_serie, observacoes });
    await nobreak.save();
    res.status(201).json({ message: 'Nobreak inserido com sucesso' });
});

// Atualizar as informações do ativo nobreak (referência = n_serie)
router.put('/:n_serie', async (req, res) => {
    const { n_serie } = req.params;
    const { cpf, modelo, observacoes } = req.body;

    const result = await Nobreak.updateOne({ n_serie }, {
        cpf, modelo, n_serie, observacoes
    });

    if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'Nobreak não encontrado' });
    }

    res.status(200).json({ message: 'Nobreak atualizado com sucesso' });
});

// Limpar as informações do ativo nobreak (referência = n_serie)
router.delete('/:n_serie', async (req, res) => {
    const { n_serie } = req.params;

    const result = await Nobreak.deleteOne({ n_serie });
    if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Nobreak não encontrado' });
    }

    res.status(200).json({ message: 'Nobreak excluído com sucesso' });
});

module.exports = router;
