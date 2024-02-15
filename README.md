### Api-Users-Roles
Esta API é desenvolvida para gerenciar usuários e suas funções, utilizando Node.js, TypeScript, PostgreSQL e várias bibliotecas populares.

###Clonando o repositorio:
git clone https://github.com/YanLucass/Api-Users-Roles

### Instalando depêndencias:
cd Api-Users-Roles
npm i 


## Configurar banco de dados:

1. Crie um banco de dados PostgreSQL para a aplicação.
2. Copie o conteúdo do arquivo `.env.example` para um novo arquivo chamado `.env`.
3. Preencha as variáveis de ambiente no arquivo `.env` com as informações do seu banco de dados.
4. Segue modelo das variáveis:
   
5. PORT=5000
   DB_TYPE=
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=
   DB_PASSWORD=
   DB_DATABASE=

   JWT_SECRET=
   JWT_EXPIRES_IN=

### Rodar projeto:

Criar tabelas: npm run typeorm -- -d  ./src/shared/typeorm/index.ts migration:run
Criar usuário padrão: npm run seed:admin
Iniciar: npm start

Documentação: http://localhost:5000/docs/



