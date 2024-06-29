# Inventário de Ativos de TI

Este projeto é uma aplicação de gerenciamento de inventário de ativos de TI. Ele permite a inserção, atualização, exclusão e consulta de dados de funcionários e seus ativos de TI.

## Funcionalidades

- Inserir um novo funcionário
- Excluir um funcionário
- Listar todos os funcionários
- Consultar o inventário completo de um determinado funcionário
- Atualizar o nome do funcionário pelo CPF
- Gerenciar ativos (notebook, monitor, teclado, mouse, desktop, acessórios, nobreak, headset, celular)

## Pré-requisitos

- Node.js e npm instalados
- MongoDB instalado e rodando

## Instalação

1. Clone o repositório:
    ```
    git clone URL_DO_SEU_REPOSITORIO
    ```
2. Navegue até o diretório do projeto:
    ```
    cd inv_ativos_ti
    ```
3. Instale as dependências:
    ```
    npm install
    ```

## Configuração do MongoDB

1. Certifique-se de que o MongoDB está instalado e rodando.
2. Crie o diretório de dados do MongoDB (se ainda não existir):
    ```
    mkdir C:\data\db
    ```
3. Inicie o MongoDB:
    ```
    mongod
    ```

## Executando o Projeto

1. Inicie o servidor:
    ```
    node server.js
    ```
2. Em um novo terminal, inicie a interface CLI:
    ```
    node interface/interface.js
    ```

## Utilização

Após iniciar a interface CLI, você verá um menu com várias opções para gerenciar os dados de funcionários e seus ativos de TI. Siga as instruções no terminal para realizar as operações desejadas.

## Verificação dos Dados

Você pode verificar os dados inseridos, atualizados e deletados utilizando o MongoDB Compass:
1. Abra o MongoDB Compass e conecte-se ao seu MongoDB local (`mongodb://localhost:27017`).
2. Selecione o banco de dados `inv_ativos_ti`.
3. Verifique as coleções relevantes, como `funcionarios`, clicando em "Refresh" para ver os dados atualizados.
