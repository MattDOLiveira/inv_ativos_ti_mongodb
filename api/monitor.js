const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const monitorSchema = new mongoose.Schema({
    cpf: String,
    modelo: String,
    n_serie: String,
    observacoes: String
});

const Monitor = mongoose.model('Monitor', monitorSchema);

function validarCPF(cpf) {
    return cpf.length === 11;
}

// Inserir ativo monitor
router.post('/', async (req, res) => {
    const { cpf, modelo, n_serie, observacoes } = req.body;

    if (!validarCPF(cpf)) {
        return res.status(400).json({ message: 'CPF deve conter 11 dígitos' });
    }

    const monitorCount = await Monitor.countDocuments({ cpf });
    if (monitorCount >= 2) {
        return res.status(400).json({ message: 'Funcionario já possuí dois monitores' });
    }

    const monitor = new Monitor({ cpf, modelo, n_serie, observacoes });
    await monitor.save();
    res.status(201).json({ message: 'Monitor inserido com sucesso' });
});

// Atualizar as informações do ativo monitor (referência = n_serie)
router.put('/:n_serie', async (req, res) => {
    const { n_serie } = req.params;
    const { cpf, modelo, observacoes } = req.body;

    const result = await Monitor.updateOne({ n_serie }, {
        cpf, modelo, n_serie, observacoes
    });

    if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'Monitor não encontrado' });
    }

    res.status(200).json({ message: 'Monitor atualizado com sucesso' });
});

// Limpar as informações do ativo monitor (referência = n_serie)
router.delete('/:n_serie', async (req, res) => {
    const { n_serie } = req.params;

    const result = await Monitor.deleteOne({ n_serie });
    if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Monitor não encontrado' });
    }

    res.status(200).json({ message: 'Monitor excluído com sucesso' });
});

module.exports = router;
