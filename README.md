# ligue-challenge

Resolução do teste para desenvolvedor backend da LIGUE

# Solução realizada utilizando:
 * NodeJS;
 * Framework express;
 * Testes com Jest, para executar os testes executar o comando `yarn test`;
 * Migration com Sequelize;
 * Banco de dados para testes sqlite;
 * Banco de dados postgres, para iniciar a imagem docker, basta executar o arquivo \dabase_docker\docker-compose.yml com o comando: `docker-compose up -d` acesso ao pgadmin4 web: http://localhost:16543 e configuração conforme imagem abaixo. Senhas dentro do arquivo docker-compose.yml  
 * ![pgadmin-config](./images/postgres-config.png) 

# Gerenciamento de pacotes
* yarn;

# Dependências:
|Pacote|Versão
|---|---|
|dotenv|10.0.0|
|express|4.17.1|
|pg|8.7.1|
|sequelize|6.7.0|
|jest|27.2.5|
|nodemon|2.0.13|
|sequelize|6.2.0|
|sqlite3|5.0.2|
|supertest|6.1.6|

## Executar os seguintes comandos para baixar as dependências:

### Pacotes do ambiente
yarn add dotenv express pg sequelize

### Pacotes do ambiente de desenvolvimento
yarn add jest nodemon sequelize-cli sqlite3 supertest -d

# Métodos
|Método|Ação|
|---|---|
|GET /developers | Retorna todos os desenvolvedores|
|GET /developers/filter?|Retorna os desenvolvedores de acordo com o termo passado via querystring e paginação|
|GET /developers/{id}|Retorna os dados de um desenvolvedor|
|POST /developers|Adiciona um novo desenvolvedor|
|PUT /developers/{id}|Atualiza os dados de um desenvolvedor|
|DELETE /developers/{id}|Apaga o registro de um desenvolvedor|

# Especificação
https://bitbucket.org/gabrielsartor/ligue-challenge/src/master/README.md