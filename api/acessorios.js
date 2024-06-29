const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const acessoriosSchema = new mongoose.Schema({
    cpf: String,
    suporte_notebook: Boolean,
    mouse_pad: Boolean,
    observacoes: String
});

const Acessorios = mongoose.model('Acessorios', acessoriosSchema);

function validarCPF(cpf) {
    return cpf.length === 11;
}

// Inserir ativo acessorios
router.post('/', async (req, res) => {
    const { cpf, suporte_notebook, mouse_pad, observacoes } = req.body;

    if (!validarCPF(cpf)) {
        return res.status(400).json({ message: 'CPF deve conter 11 dígitos' });
    }

    const existingAcessorios = await Acessorios.findOne({ cpf });
    if (existingAcessorios) {
        return res.status(400).json({ message: 'Funcionario já possuí acessórios' });
    }

    const acessorios = new Acessorios({ cpf, suporte_notebook, mouse_pad, observacoes });
    await acessorios.save();
    res.status(201).json({ message: 'Acessórios inseridos com sucesso' });
});

// Atualizar as informações do ativo acessórios (referência = CPF)
router.put('/:cpf', async (req, res) => {
    const { cpf } = req.params;
    const { suporte_notebook, mouse_pad, observacoes } = req.body;

    const result = await Acessorios.updateOne({ cpf }, {
        suporte_notebook, mouse_pad, observacoes
    });

    if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'Acessórios não encontrados' });
    }

    res.status(200).json({ message: 'Acessórios atualizados com sucesso' });
});

// Limpar as informações do ativo acessórios (referência = CPF)
router.delete('/:cpf', async (req, res) => {
    const { cpf } = req.params;

    const result = await Acessorios.deleteOne({ cpf });
    if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Acessórios não encontrados' });
    }

    res.status(200).json({ message: 'Acessórios excluídos com sucesso' });
});

module.exports = router;
