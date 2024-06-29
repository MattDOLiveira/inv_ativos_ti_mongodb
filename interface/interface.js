const readline = require('readline');
const axios = require('axios');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const menu = () => {
    console.log(`
    === Menu ===
    1. Inserir funcionário
    2. Excluir funcionário
    3. Listar funcionários
    4. Atualizar funcionário
    5. Consultar inventário de um funcionário
    6. Inserir ativo notebook
    7. Atualizar informações do ativo notebook
    8. Excluir ativo notebook
    9. Inserir ativo monitor
    10. Atualizar informações do ativo monitor
    11. Excluir ativo monitor
    12. Inserir ativo teclado
    13. Atualizar informações do ativo teclado
    14. Excluir ativo teclado
    15. Inserir ativo mouse
    16. Atualizar informações do ativo mouse
    17. Excluir ativo mouse
    18. Inserir ativo nobreak
    19. Atualizar informações do ativo nobreak
    20. Excluir ativo nobreak
    21. Inserir ativo headset
    22. Atualizar informações do ativo headset
    23. Excluir ativo headset
    24. Inserir ativo desktop
    25. Atualizar informações do ativo desktop
    26. Excluir ativo desktop
    27. Inserir ativo celular
    28. Atualizar informações do ativo celular
    29. Excluir ativo celular
    30. Inserir ativo acessórios
    31. Atualizar informações do ativo acessórios
    32. Excluir ativo acessórios
    33. Sair
    `);

    rl.question('Escolha uma opção: ', (opcao) => {
        switch (opcao) {
            case '1':
                inserirFuncionario();
                break;
            case '2':
                excluirFuncionario();
                break;
            case '3':
                listarFuncionarios();
                break;
            case '4':
                atualizarFuncionario();
                break;
            case '5':
                consultarInventario();
                break;
            case '6':
                inserirNotebook();
                break;
            case '7':
                atualizarNotebook();
                break;
            case '8':
                excluirNotebook();
                break;
            case '9':
                inserirMonitor();
                break;
            case '10':
                atualizarMonitor();
                break;
            case '11':
                excluirMonitor();
                break;
            case '12':
                inserirTeclado();
                break;
            case '13':
                atualizarTeclado();
                break;
            case '14':
                excluirTeclado();
                break;
            case '15':
                inserirMouse();
                break;
            case '16':
                atualizarMouse();
                break;
            case '17':
                excluirMouse();
                break;
            case '18':
                inserirNobreak();
                break;
            case '19':
                atualizarNobreak();
                break;
            case '20':
                excluirNobreak();
                break;
            case '21':
                inserirHeadset();
                break;
            case '22':
                atualizarHeadset();
                break;
            case '23':
                excluirHeadset();
                break;
            case '24':
                inserirDesktop();
                break;
            case '25':
                atualizarDesktop();
                break;
            case '26':
                excluirDesktop();
                break;
            case '27':
                inserirCelular();
                break;
            case '28':
                atualizarCelular();
                break;
            case '29':
                excluirCelular();
                break;
            case '30':
                inserirAcessorios();
                break;
            case '31':
                atualizarAcessorios();
                break;
            case '32':
                excluirAcessorios();
                break;
            case '33':
                console.log('Saindo...');
                rl.close();
                break;
            default:
                console.log('Opção inválida. Tente novamente.');
                menu();
        }
    });
};

const inserirFuncionario = () => {
    rl.question('Digite o CPF do funcionário: ', (cpf) => {
        rl.question('Digite o nome do funcionário: ', async (nome) => {
            try {
                const response = await axios.post('http://localhost:5000/funcionario', { cpf, nome });
                console.log(response.data);
            } catch (error) {
                console.error(error.response.data);
            }
            menu();
        });
    });
};

const excluirFuncionario = () => {
    rl.question('Digite o CPF do funcionário que deseja excluir: ', async (cpf) => {
        try {
            const response = await axios.delete(`http://localhost:5000/funcionario/${cpf}`);
            console.log(response.data);
        } catch (error) {
            console.error(error.response.data);
        }
        menu();
    });
};

const listarFuncionarios = async () => {
    try {
        const response = await axios.get('http://localhost:5000/funcionario');
        console.log(response.data);
    } catch (error) {
        console.error(error.response.data);
    }
    menu();
};

const atualizarFuncionario = () => {
    rl.question('Digite o CPF do funcionário que deseja atualizar o nome: ', (cpf) => {
        rl.question('Digite o novo nome do funcionário: ', async (nome) => {
            try {
                const response = await axios.put(`http://localhost:5000/funcionario/${cpf}`, { nome });
                console.log(response.data);
            } catch (error) {
                console.error(error.response.data);
            }
            menu();
        });
    });
};

const consultarInventario = () => {
    rl.question('Digite o CPF do funcionário que deseja consultar o inventário: ', async (cpf) => {
        try {
            const response = await axios.get(`http://localhost:5000/funcionario/${cpf}`);
            console.log(response.data);
        } catch (error) {
            console.error(error.response.data);
        }
        menu();
    });
};

// Notebook
const inserirNotebook = () => {
    rl.question('Digite o CPF do funcionário: ', (cpf) => {
        rl.question('Digite a TAG do notebook: ', (tag) => {
            rl.question('Digite o modelo do notebook: ', (modelo) => {
                rl.question('Digite o número de série do notebook: ', (n_serie) => {
                    rl.question('Digite a versão do sistema operacional do notebook: ', (versao_so) => {
                        rl.question('Digite as características do notebook: ', (caracteristicas) => {
                            rl.question('Digite observações sobre o notebook: ', async (observacoes) => {
                                try {
                                    const response = await axios.post('http://localhost:5000/notebook', {
                                        cpf, tag, modelo, n_serie, versao_so, caracteristicas, observacoes
                                    });
                                    console.log(response.data);
                                } catch (error) {
                                    console.error(error.response.data);
                                }
                                menu();
                            });
                        });
                    });
                });
            });
        });
    });
};

const atualizarNotebook = () => {
    rl.question('Digite a TAG do notebook que deseja atualizar: ', (tag) => {
        rl.question('Digite o CPF do funcionário: ', (cpf) => {
            rl.question('Digite o novo modelo do notebook: ', (modelo) => {
                rl.question('Digite o novo número de série do notebook: ', (n_serie) => {
                    rl.question('Digite a nova versão do sistema operacional do notebook: ', (versao_so) => {
                        rl.question('Digite as novas características do notebook: ', (caracteristicas) => {
                            rl.question('Digite as novas observações do notebook: ', async (observacoes) => {
                                try {
                                    const response = await axios.put(`http://localhost:5000/notebook/${tag}`, {
                                        cpf, modelo, n_serie, versao_so, caracteristicas, observacoes
                                    });
                                    console.log(response.data);
                                } catch (error) {
                                    console.error(error.response.data);
                                }
                                menu();
                            });
                        });
                    });
                });
            });
        });
    });
};

const excluirNotebook = () => {
    rl.question('Digite a TAG do notebook que deseja excluir: ', async (tag) => {
        try {
            const response = await axios.delete(`http://localhost:5000/notebook/${tag}`);
            console.log(response.data);
        } catch (error) {
            console.error(error.response.data);
        }
        menu();
    });
};

// Monitor
const inserirMonitor = () => {
    rl.question('Digite o CPF do funcionário: ', (cpf) => {
        rl.question('Digite o modelo do monitor: ', (modelo) => {
            rl.question('Digite o número de série do monitor: ', (n_serie) => {
                rl.question('Digite observações sobre o monitor: ', async (observacoes) => {
                    try {
                        const response = await axios.post('http://localhost:5000/monitor', {
                            cpf, modelo, n_serie, observacoes
                        });
                        console.log(response.data);
                    } catch (error) {
                        console.error(error.response.data);
                    }
                    menu();
                });
            });
        });
    });
};

const atualizarMonitor = () => {
    rl.question('Digite o número de série do monitor que deseja atualizar: ', (n_serie) => {
        rl.question('Digite o CPF do funcionário: ', (cpf) => {
            rl.question('Digite o novo modelo do monitor: ', (modelo) => {
                rl.question('Digite as novas observações do monitor: ', async (observacoes) => {
                    try {
                        const response = await axios.put(`http://localhost:5000/monitor/${n_serie}`, {
                            cpf, modelo, n_serie, observacoes
                        });
                        console.log(response.data);
                    } catch (error) {
                        console.error(error.response.data);
                    }
                    menu();
                });
            });
        });
    });
};

const excluirMonitor = () => {
    rl.question('Digite o número de série do monitor que deseja excluir: ', async (n_serie) => {
        try {
            const response = await axios.delete(`http://localhost:5000/monitor/${n_serie}`);
            console.log(response.data);
        } catch (error) {
            console.error(error.response.data);
        }
        menu();
    });
};

// Teclado
const inserirTeclado = () => {
    rl.question('Digite o CPF do funcionário: ', (cpf) => {
        rl.question('Digite o modelo do teclado: ', (modelo) => {
            rl.question('Digite o número de série do teclado: ', (n_serie) => {
                rl.question('Digite observações sobre o teclado: ', async (observacoes) => {
                    try {
                        const response = await axios.post('http://localhost:5000/teclado', {
                            cpf, modelo, n_serie, observacoes
                        });
                        console.log(response.data);
                    } catch (error) {
                        console.error(error.response.data);
                    }
                    menu();
                });
            });
        });
    });
};

const atualizarTeclado = () => {
    rl.question('Digite o número de série do teclado que deseja atualizar: ', (n_serie) => {
        rl.question('Digite o CPF do funcionário: ', (cpf) => {
            rl.question('Digite o novo modelo do teclado: ', (modelo) => {
                rl.question('Digite as novas observações do teclado: ', async (observacoes) => {
                    try {
                        const response = await axios.put(`http://localhost:5000/teclado/${n_serie}`, {
                            cpf, modelo, n_serie, observacoes
                        });
                        console.log(response.data);
                    } catch (error) {
                        console.error(error.response.data);
                    }
                    menu();
                });
            });
        });
    });
};

const excluirTeclado = () => {
    rl.question('Digite o número de série do teclado que deseja excluir: ', async (n_serie) => {
        try {
            const response = await axios.delete(`http://localhost:5000/teclado/${n_serie}`);
            console.log(response.data);
        } catch (error) {
            console.error(error.response.data);
        }
        menu();
    });
};

// Mouse
const inserirMouse = () => {
    rl.question('Digite o CPF do funcionário: ', (cpf) => {
        rl.question('Digite o modelo do mouse: ', (modelo) => {
            rl.question('Digite o número de série do mouse: ', (n_serie) => {
                rl.question('Digite observações sobre o mouse: ', async (observacoes) => {
                    try {
                        const response = await axios.post('http://localhost:5000/mouse', {
                            cpf, modelo, n_serie, observacoes
                        });
                        console.log(response.data);
                    } catch (error) {
                        console.error(error.response.data);
                    }
                    menu();
                });
            });
        });
    });
};

const atualizarMouse = () => {
    rl.question('Digite o número de série do mouse que deseja atualizar: ', (n_serie) => {
        rl.question('Digite o CPF do funcionário: ', (cpf) => {
            rl.question('Digite o novo modelo do mouse: ', (modelo) => {
                rl.question('Digite as novas observações do mouse: ', async (observacoes) => {
                    try {
                        const response = await axios.put(`http://localhost:5000/mouse/${n_serie}`, {
                            cpf, modelo, n_serie, observacoes
                        });
                        console.log(response.data);
                    } catch (error) {
                        console.error(error.response.data);
                    }
                    menu();
                });
            });
        });
    });
};

const excluirMouse = () => {
    rl.question('Digite o número de série do mouse que deseja excluir: ', async (n_serie) => {
        try {
            const response = await axios.delete(`http://localhost:5000/mouse/${n_serie}`);
            console.log(response.data);
        } catch (error) {
            console.error(error.response.data);
        }
        menu();
    });
};

// Nobreak
const inserirNobreak = () => {
    rl.question('Digite o CPF do funcionário: ', (cpf) => {
        rl.question('Digite o modelo do nobreak: ', (modelo) => {
            rl.question('Digite o número de série do nobreak: ', (n_serie) => {
                rl.question('Digite observações sobre o nobreak: ', async (observacoes) => {
                    try {
                        const response = await axios.post('http://localhost:5000/nobreak', {
                            cpf, modelo, n_serie, observacoes
                        });
                        console.log(response.data);
                    } catch (error) {
                        console.error(error.response.data);
                    }
                    menu();
                });
            });
        });
    });
};

const atualizarNobreak = () => {
    rl.question('Digite o número de série do nobreak que deseja atualizar: ', (n_serie) => {
        rl.question('Digite o CPF do funcionário: ', (cpf) => {
            rl.question('Digite o novo modelo do nobreak: ', (modelo) => {
                rl.question('Digite as novas observações do nobreak: ', async (observacoes) => {
                    try {
                        const response = await axios.put(`http://localhost:5000/nobreak/${n_serie}`, {
                            cpf, modelo, n_serie, observacoes
                        });
                        console.log(response.data);
                    } catch (error) {
                        console.error(error.response.data);
                    }
                    menu();
                });
            });
        });
    });
};

const excluirNobreak = () => {
    rl.question('Digite o número de série do nobreak que deseja excluir: ', async (n_serie) => {
        try {
            const response = await axios.delete(`http://localhost:5000/nobreak/${n_serie}`);
            console.log(response.data);
        } catch (error) {
            console.error(error.response.data);
        }
        menu();
    });
};

// Headset
const inserirHeadset = () => {
    rl.question('Digite o CPF do funcionário: ', (cpf) => {
        rl.question('Digite o modelo do headset: ', (modelo) => {
            rl.question('Digite o número de série do headset: ', (n_serie) => {
                rl.question('Digite observações sobre o headset: ', async (observacoes) => {
                    try {
                        const response = await axios.post('http://localhost:5000/headset', {
                            cpf, modelo, n_serie, observacoes
                        });
                        console.log(response.data);
                    } catch (error) {
                        console.error(error.response.data);
                    }
                    menu();
                });
            });
        });
    });
};

const atualizarHeadset = () => {
    rl.question('Digite o número de série do headset que deseja atualizar: ', (n_serie) => {
        rl.question('Digite o CPF do funcionário: ', (cpf) => {
            rl.question('Digite o novo modelo do headset: ', (modelo) => {
                rl.question('Digite as novas observações do headset: ', async (observacoes) => {
                    try {
                        const response = await axios.put(`http://localhost:5000/headset/${n_serie}`, {
                            cpf, modelo, n_serie, observacoes
                        });
                        console.log(response.data);
                    } catch (error) {
                        console.error(error.response.data);
                    }
                    menu();
                });
            });
        });
    });
};

const excluirHeadset = () => {
    rl.question('Digite o número de série do headset que deseja excluir: ', async (n_serie) => {
        try {
            const response = await axios.delete(`http://localhost:5000/headset/${n_serie}`);
            console.log(response.data);
        } catch (error) {
            console.error(error.response.data);
        }
        menu();
    });
};

// Celular
const inserirCelular = () => {
    rl.question('Digite o CPF do funcionário: ', (cpf) => {
        rl.question('Digite o modelo do celular: ', (modelo) => {
            rl.question('Digite o IMEI do celular: ', (imei1) => {
                rl.question('Digite o número do celular: ', (numero) => {
                    rl.question('Digite observações sobre o celular: ', async (observacoes) => {
                        try {
                            const response = await axios.post('http://localhost:5000/celular', {
                                cpf, modelo, imei1, numero, observacoes
                            });
                            console.log(response.data);
                        } catch (error) {
                            console.error(error.response.data);
                        }
                        menu();
                    });
                });
            });
        });
    });
};

const atualizarCelular = () => {
    rl.question('Digite o IMEI do celular que deseja atualizar: ', (imei1) => {
        rl.question('Digite o CPF do funcionário: ', (cpf) => {
            rl.question('Digite o novo modelo do celular: ', (modelo) => {
                rl.question('Digite o novo número do celular: ', (numero) => {
                    rl.question('Digite as novas observações do celular: ', async (observacoes) => {
                        try {
                            const response = await axios.put(`http://localhost:5000/celular/${imei1}`, {
                                cpf, modelo, imei1, numero, observacoes
                            });
                            console.log(response.data);
                        } catch (error) {
                            console.error(error.response.data);
                        }
                        menu();
                    });
                });
            });
        });
    });
};

const excluirCelular = () => {
    rl.question('Digite o IMEI do celular que deseja excluir: ', async (imei1) => {
        try {
            const response = await axios.delete(`http://localhost:5000/celular/${imei1}`);
            console.log(response.data);
        } catch (error) {
            console.error(error.response.data);
        }
        menu();
    });
};

// Acessórios
const inserirAcessorios = () => {
    rl.question('Digite o CPF do funcionário: ', (cpf) => {
        rl.question('Digite a quantidade de suportes de notebook: ', (suporte_notebook) => {
            rl.question('Digite a quantidade de mouse pads: ', (mouse_pad) => {
                rl.question('Digite observações sobre os acessórios: ', async (observacoes) => {
                    try {
                        const response = await axios.post('http://localhost:5000/acessorios', {
                            cpf, suporte_notebook, mouse_pad, observacoes
                        });
                        console.log(response.data);
                    } catch (error) {
                        console.error(error.response.data);
                    }
                    menu();
                });
            });
        });
    });
};

const atualizarAcessorios = () => {
    rl.question('Digite o CPF do funcionário que deseja atualizar os acessórios: ', (cpf) => {
        rl.question('Digite a nova quantidade de suportes de notebook: ', (suporte_notebook) => {
            rl.question('Digite a nova quantidade de mouse pads: ', (mouse_pad) => {
                rl.question('Digite as novas observações dos acessórios: ', async (observacoes) => {
                    try {
                        const response = await axios.put(`http://localhost:5000/acessorios/${cpf}`, {
                            cpf, suporte_notebook, mouse_pad, observacoes
                        });
                        console.log(response.data);
                    } catch (error) {
                        console.error(error.response.data);
                    }
                    menu();
                });
            });
        });
    });
};

const excluirAcessorios = () => {
    rl.question('Digite o CPF do funcionário que deseja excluir os acessórios: ', async (cpf) => {
        try {
            const response = await axios.delete(`http://localhost:5000/acessorios/${cpf}`);
            console.log(response.data);
        } catch (error) {
            console.error(error.response.data);
        }
        menu();
    });
};

// Desktop
const inserirDesktop = () => {
    rl.question('Digite o CPF do funcionário: ', (cpf) => {
        rl.question('Digite o modelo do desktop: ', (modelo) => {
            rl.question('Digite a TAG do desktop: ', (tag) => {
                rl.question('Digite o número de série do desktop: ', (n_serie) => {
                    rl.question('Digite a versão do desktop: ', (versao) => {
                        rl.question('Digite as características do desktop: ', (caracteristicas) => {
                            rl.question('Digite as observações do desktop: ', async (observacoes) => {
                                try {
                                    const response = await axios.post('http://localhost:5000/desktop', {
                                        cpf, modelo, tag, n_serie, versao, caracteristicas, observacoes
                                    });
                                    console.log(response.data);
                                } catch (error) {
                                    console.error(error.response.data);
                                }
                                menu();
                            });
                        });
                    });
                });
            });
        });
    });
};

const atualizarDesktop = () => {
    rl.question('Digite a TAG do desktop que deseja atualizar: ', (tag) => {
        rl.question('Digite o CPF do funcionário: ', (cpf) => {
            rl.question('Digite o novo modelo do desktop: ', (modelo) => {
                rl.question('Digite o novo número de série do desktop: ', (n_serie) => {
                    rl.question('Digite a nova versão do desktop: ', (versao) => {
                        rl.question('Digite as novas características do desktop: ', (caracteristicas) => {
                            rl.question('Digite as novas observações do desktop: ', async (observacoes) => {
                                try {
                                    const response = await axios.put(`http://localhost:5000/desktop/${tag}`, {
                                        cpf, modelo, tag, n_serie, versao, caracteristicas, observacoes
                                    });
                                    console.log(response.data);
                                } catch (error) {
                                    console.error(error.response.data);
                                }
                                menu();
                            });
                        });
                    });
                });
            });
        });
    });
};

const excluirDesktop = () => {
    rl.question('Digite a TAG do desktop que deseja excluir: ', async (tag) => {
        try {
            const response = await axios.delete(`http://localhost:5000/desktop/${tag}`);
            console.log(response.data);
        } catch (error) {
            console.error(error.response.data);
        }
        menu();
    });
};

// Inicia o menu
menu();
