const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const funcionarioSchema = new mongoose.Schema({
    _id: String,
    nome: String
});

const Funcionario = mongoose.model('Funcionario', funcionarioSchema);

function validarCPF(cpf) {
    return cpf.length === 11;
}

// Inserir um novo funcionário
router.post('/', async (req, res) => {
    const { cpf, nome } = req.body;

    if (!validarCPF(cpf)) {
        return res.status(400).json({ message: 'CPF deve conter 11 dígitos' });
    }

    const existingFuncionario = await Funcionario.findById(cpf);
    if (existingFuncionario) {
        return res.status(400).json({ message: 'CPF já cadastrado' });
    }

    const funcionario = new Funcionario({ _id: cpf, nome });
    await funcionario.save();
    res.status(201).json({ message: 'Funcionário inserido com sucesso' });
});

// Excluir um funcionário pelo CPF
router.delete('/:cpf', async (req, res) => {
    const { cpf } = req.params;

    if (!validarCPF(cpf)) {
        return res.status(400).json({ message: 'CPF inválido' });
    }

    const result = await Funcionario.findByIdAndDelete(cpf);
    if (!result) {
        return res.status(404).json({ message: 'Funcionário não encontrado' });
    }

    res.status(200).json({ message: 'Funcionário excluído com sucesso' });
});

// Listar todos os funcionários
router.get('/', async (req, res) => {
    try {
        const funcionarios = await Funcionario.find({}, '_id nome');
        res.status(200).json(funcionarios);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar funcionários' });
    }
});

// Atualizar o nome do funcionário pelo CPF
router.put('/:cpf', async (req, res) => {
    const { cpf } = req.params;
    const { nome } = req.body;

    if (!validarCPF(cpf)) {
        return res.status(400).json({ message: 'CPF inválido' });
    }

    try {
        const result = await Funcionario.findByIdAndUpdate(cpf, { nome }, { new: true });
        if (!result) {
            return res.status(404).json({ message: 'Funcionário não encontrado' });
        }

        res.status(200).json({ message: 'Nome do funcionário atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar o funcionário' });
    }
});

// Consultar o inventário completo de um funcionário
router.get('/:cpf', async (req, res) => {
    const { cpf } = req.params;

    try {
        const funcionario = await Funcionario.findById(cpf);
        if (!funcionario) {
            return res.status(404).json({ message: 'Funcionário não encontrado' });
        }

        res.status(200).json({ funcionario /*, other assets */ });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao consultar o funcionário' });
    }
});

module.exports = router;
