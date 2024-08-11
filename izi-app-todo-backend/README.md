# izi-app-todo-back

Este projeto é uma aplicação web desenvolvida utilizando Node.js com o framework Express. Ele inclui autenticação com JWT e armazenamento de dados utilizando PostgreSQL ou MySQL com o ORM Sequelize.

## Principais Dependências

- **Express**: Framework web para Node.js.
- **Sequelize**: ORM para Node.js que suporta PostgreSQL, MySQL, entre outros.
- **jsonwebtoken**: Para criação e verificação de tokens JWT.
- **bcryptjs**: Para hash de senhas.
- **dotenv**: Para gerenciar variáveis de ambiente.

## Dependências de Desenvolvimento

- **Sequelize CLI**: Ferramenta de linha de comando para o Sequelize.

## Configuração do Ambiente Local

### Pré-Requisitos

- Node.js (Baixe e instale de [Node.js](https://nodejs.org/))
- PostgreSQL ou MySQL (Dependendo da sua escolha de banco de dados)
- npm (Normalmente incluído na instalação do Node.js)
- Git (Opcional, para clonagem do repositório)

### Configuração Inicial

1. **Clonar o Repositório e entrar na pasta do backend:**

   ```bash
   git clone https://github.com/Jeimissonb/izi-app-todo.git
   cd izi-app-todo
   cd izi-app-todo-backend
   ```

2. **Instalar Dependências:**

   ```bash
   npm install
   ```

3. **Configuração do Banco de Dados:**

   - Crie um banco de dados PostgreSQL ou MySQL com o nome `izi_app_todo_db` ou o nome de sua escolha, conforme esteja configurado em `config/config.js` (para ambientes de desenvolvimento e testes, as configurações não vem do .env, optei por deixa-las mockadas, um outro padrão interessante aqui seria criar arquivos '.env.development' e '.env.test' para associar aos respectivos contextos).
   - Configure as credenciais do banco de dados e outras configurações em `config/config.js`. Exemplo:

     ```javascript
     require("dotenv").config(); // Carrega as variáveis de ambiente do arquivo .env

     module.exports = {
       development: {
         username: "postgres",
         password: "123456",
         database: "izi_app_todo_db",
         host: "127.0.0.1",
         dialect: "postgres",
       },
       test: {
         username: "postgres",
         password: "123456",
         database: "izi_app_todo_db",
         host: "127.0.0.1",
         dialect: "postgres",
       },
       production: {
         username: process.env.DB_USERNAME,
         password: process.env.DB_PASSWORD,
         database: process.env.DB_NAME,
         host: process.env.DB_HOST,
         dialect: process.env.DB_DIALECT,
         logging: false,
       },
     };
     ```

4. **Configurar Variáveis de Ambiente (.env):**

   ```plaintext
   # JWT
   JWT_SECRET=izi_app_todo_jwt_secret

   # Database
   DB_USERNAME=your_db_username
   DB_PASSWORD=your_db_password
   DB_NAME=izi_app_todo_db
   DB_HOST=127.0.0.1
   DB_DIALECT=postgres # ou mysql
   ```

5. **Executar Migrações:**
   ```bash
   npx sequelize-cli db:migrate
   ```

6. **Executar SEEDS:**
   ```bash
   npx sequelize-cli db:seed:all
   ```
   

### Execução

- **Iniciar o Servidor de Desenvolvimento, através de um script que criei para facilitar:**
  ```bash
  npm start
  ```

Agora, o servidor deve estar rodando em `http://localhost:3000`. Acesse o endereço em um navegador ou use uma ferramenta como Postman para interagir com a API.

- **Coleção do postman**
  ```plaintext
  * A coleção está na pasta: /collections/IZI APP - TODO.postman_collection
  * O enviroment utilizado na coleção está na pasta /collections/izi-app-localhost.postman_environment
  ```
  Basta importar a coleção e o enviroment dentro do seu ambiente do postman e iniciar!
  OBS: Recomendo iniciar da requisição: POST User, pois é esta requisição responsável por criar o usuário a ser utilizado nas demais requisições, por conta da autenticação.
  Logo em seguida ir na requisição de LOGIN User, para autenticar e capturar o token a ser utilizado nas demais requisições.
  O token é setado na variável de ambiente do enviroment de forma automática, caso esteja tudo importado corretamente.
