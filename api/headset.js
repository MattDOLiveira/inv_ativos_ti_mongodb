const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const headsetSchema = new mongoose.Schema({
    cpf: String,
    modelo: String,
    n_serie: String,
    observacoes: String
});

const Headset = mongoose.model('Headset', headsetSchema);

function validarCPF(cpf) {
    return cpf.length === 11;
}

// Inserir ativo headset
router.post('/', async (req, res) => {
    const { cpf, modelo, n_serie, observacoes } = req.body;

    if (!validarCPF(cpf)) {
        return res.status(400).json({ message: 'CPF deve conter 11 dígitos' });
    }

    const existingHeadset = await Headset.findOne({ cpf });
    if (existingHeadset) {
        return res.status(400).json({ message: 'Funcionario já possuí headset' });
    }

    const headset = new Headset({ cpf, modelo, n_serie, observacoes });
    await headset.save();
    res.status(201).json({ message: 'Headset inserido com sucesso' });
});

// Atualizar as informações do ativo headset (referência = n_serie)
router.put('/:n_serie', async (req, res) => {
    const { n_serie } = req.params;
    const { cpf, modelo, observacoes } = req.body;

    const result = await Headset.updateOne({ n_serie }, {
        cpf, modelo, n_serie, observacoes
    });

    if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'Headset não encontrado' });
    }

    res.status(200).json({ message: 'Headset atualizado com sucesso' });
});

// Limpar as informações do ativo headset (referência = n_serie)
router.delete('/:n_serie', async (req, res) => {
    const { n_serie } = req.params;

    const result = await Headset.deleteOne({ n_serie });
    if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Headset não encontrado' });
    }

    res.status(200).json({ message: 'Headset excluído com sucesso' });
});

module.exports = router;
