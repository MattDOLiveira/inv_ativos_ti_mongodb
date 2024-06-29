const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const celularSchema = new mongoose.Schema({
    cpf: String,
    modelo: String,
    imei1: String,
    numero: String,
    observacoes: String
});

const Celular = mongoose.model('Celular', celularSchema);

function validarCPF(cpf) {
    return cpf.length === 11;
}

// Inserir ativo celular
router.post('/', async (req, res) => {
    const { cpf, modelo, imei1, numero, observacoes } = req.body;

    if (!validarCPF(cpf)) {
        return res.status(400).json({ message: 'CPF deve conter 11 dígitos' });
    }

    const existingCelular = await Celular.findOne({ cpf });
    if (existingCelular) {
        return res.status(400).json({ message: 'Funcionario já possuí celular' });
    }

    const celular = new Celular({ cpf, modelo, imei1, numero, observacoes });
    await celular.save();
    res.status(201).json({ message: 'Celular inserido com sucesso' });
});

// Atualizar as informações do ativo celular (referência = imei1)
router.put('/:imei1', async (req, res) => {
    const { imei1 } = req.params;
    const { cpf, modelo, numero, observacoes } = req.body;

    const result = await Celular.updateOne({ imei1 }, {
        cpf, modelo, imei1, numero, observacoes
    });

    if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'Celular não encontrado' });
    }

    res.status(200).json({ message: 'Celular atualizado com sucesso' });
});

// Limpar as informações do ativo celular (referência = imei1)
router.delete('/:imei1', async (req, res) => {
    const { imei1 } = req.params;

    const result = await Celular.deleteOne({ imei1 });
    if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Celular não encontrado' });
    }

    res.status(200).json({ message: 'Celular excluído com sucesso' });
});

module.exports = router;
