<div align="center">
	
![GitHub top language"](https://img.shields.io/github/languages/top/renatonunes74/PS_SUPERA_Frontend.svg?style=for-the-badge)
![Repository size"](https://img.shields.io/github/repo-size/renatonunes74/PS_SUPERA_Frontend.svg?style=for-the-badge)
![GitHub last commit"](https://img.shields.io/github/last-commit/renatonunes74/PS_SUPERA_Frontend.svg?style=for-the-badge)
![Repository issues"](https://img.shields.io/github/issues/rockofox/firefox-minima.svg?style=for-the-badge)
# Processo Seletivo SUPERA
**Frontend em React de transferência de banco<br/>[Repo. da API RESTFul em Java](https://github.com/renatonunes74/PS_SUPERA_Backend)**

[Como usar](#como-usar) -
[Funcionalidades](#funcionalidades) -
[Dependências necessárias](#dependências-necessárias) -
[Tecnologias usadas](#tecnologias-usadas)
<br>
</div>

## Pré-visualização
![](preview.png)

## Como usar
1. Clone o repositório
    - `git clone https://github.com/renatonunes74/PS_SUPERA_Frontend`
1. Entre na pasta
    - `cd PS_SUPERA_Frontend`
1. Rode localmente
    - CLI / via Terminal:
        1. `npm install`
        1. `npm run start`
    - Via IDE (Vscode...)
1. Agora é só fazer as requisições para a API
	1. **OBS**: necessário estar com a [API RESTFul em Java](https://github.com/renatonunes74/PS_SUPERA_Backend) rodando localmente
 	2. **OBS**: verifique se a variável `BASEURL` em `banco/services/Services.ts` é a mesma da [API RESTFul em Java](https://github.com/renatonunes74/PS_SUPERA_Backend)

### Funcionalidades
- [x] Filtro por período de datas
- [x] Filtro por período de datas e operador de transação
- [x] Filtro por nome do operador de transação
- [x] Saldo total no geral
- [x] Saldo total por período
- [x] Limpeza dos campos

### Dependências necessárias
- [npm](https://docs.npmjs.com)

### Tecnologias usadas
- Linguagem: [TypeScript](https://www.typescriptlang.org/) 
    - Frameworks: [React](https://react.dev/)- Bibliotecas:
        - [Axios](https://axios-http.com/) (Integração para consumir a API)
        - [Day.js](https://day.js.org/) (Analisa, valida, manipula e exibe datas e horas)
        - [Material UI](https://mui.com/) (Ferramentas de interface para o React UI)
