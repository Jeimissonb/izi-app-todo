
# izi-app-todo-frontend

Este projeto é a interface web para a aplicação de gerenciamento de tarefas (To-Do List) desenvolvida utilizando React com TypeScript e Sass para estilos. A aplicação se comunica com o backend para gerenciamento de tarefas com funcionalidades avançadas, incluindo autenticação de usuário.

## Principais Dependências

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript**: Um superconjunto de JavaScript que adiciona tipagem estática.
- **Sass**: Extensão do CSS que permite o uso de variáveis, aninhamento e mais.
- **Axios**: Cliente HTTP para fazer requisições ao backend.
- **React Router DOM**: Gerenciamento de rotas para a aplicação React.

## Dependências de Desenvolvimento

- **Vite**: Ferramenta para desenvolvimento rápido de aplicações com suporte a hot module replacement (HMR).
- **ESLint**: Ferramenta de linting para manter a qualidade do código.
- **Prettier**: Ferramenta de formatação de código.

## Configuração do Ambiente Local

### Pré-Requisitos

- Node.js (Baixe e instale de [Node.js](https://nodejs.org/))
- npm (Normalmente incluído na instalação do Node.js)
- Git (Opcional, para clonagem do repositório)

### Configuração Inicial

1. **Clonar o Repositório e entrar na pasta do frontend:**

   ```bash
   git clone https://github.com/Jeimissonb/izi-app-todo.git
   cd izi-app-todo
   cd izi-app-todo-frontend
   ```

2. **Instalar Dependências:**

   ```bash
   npm install
   ```

3. **Configuração das Variáveis de Ambiente (.env):**

   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```plaintext
   VITE_API_URL=http://localhost:3000
   ```

   - **VITE_API_URL**: Define a URL base para as requisições à API do backend. Certifique-se de que a URL corresponda ao endereço em que o backend está rodando.

### Execução

- **Iniciar o Servidor de Desenvolvimento:**

  ```bash
  npm run dev
  ```

  Agora, a aplicação frontend deve estar rodando em `http://localhost:5173`. Acesse o endereço em um navegador para visualizar a interface.

- **Build para Produção:**

  Para criar uma versão otimizada da aplicação para produção:

  ```bash
  npm run build
  ```

- **Pré-visualização do Build:**

  Para pré-visualizar o build de produção:

  ```bash
  npm run preview
  ```

## Estrutura do Projeto

Abaixo está a estrutura geral das pastas e arquivos principais:

```
izi-app-todo-frontend/
│
├── public/                  # Arquivos estáticos (favicon, etc.)
├── src/                     # Código-fonte da aplicação
│   ├── assets/              # Imagens, fontes, etc.
│   ├── components/          # Componentes reutilizáveis
│   ├── pages/               # Páginas principais da aplicação
│   ├── services/            # Configuração do Axios e chamadas à API
│   ├── contexts/            # Contextos globais para a aplicação
│   ├── App.tsx              # Componente principal da aplicação
│   ├── main.tsx             # Ponto de entrada da aplicação
│   ├── routes.tsx           # Configuração das rotas da aplicação
│   └── index.css            # Estilos globais
│
├── .env                     # Variáveis de ambiente
├── .eslintrc.js             # Configuração do ESLint
├── .prettierrc              # Configuração do Prettier
├── tsconfig.json            # Configuração do TypeScript
└── vite.config.ts           # Configuração do Vite
```

## Componentes

- **Button**: Componente reutilizável de botão com suporte a estilos personalizados, incluindo variantes como `primary`.
- **Input**: Componente reutilizável para campos de entrada de texto, com suporte a diferentes tipos e placeholders.
- **Notification**: Componente responsável por exibir mensagens de notificação temporárias para o usuário, como sucessos e erros.
- **LogoutButton**: Componente que exibe o botão de logout e informações do usuário logado.
- **PrivateRoute**: Componente responsável por controlar rotas autenticadas e fazer o respectivo redirect para login.
  
## Páginas

- **LoginPage**: Página para login de usuários. Contém campos para email e senha, e integra-se ao backend para autenticação.
- **RegisterPage**: Página para registro de novos usuários, permitindo que eles criem uma nova conta.
- **TodoListPage**: Página principal da aplicação, onde os usuários podem visualizar, adicionar, editar, e excluir tarefas. Integra-se ao backend para manipulação de dados.
- ***-->TaskList***: Componente que encapsula a lista de tarefas de TodoListPage, que contém todas as funções do crud.


## Observações

- **Integração com o Backend**: Certifique-se de que o backend esteja rodando e que a URL configurada em `VITE_API_URL` no arquivo `.env` esteja correta para que o frontend possa se comunicar com a API.