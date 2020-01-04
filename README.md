<p align="center">
  <a href="" rel="noopener">
 <img width=200px src="https://github.com/Rocketseat/bootcamp-gostack-desafio-02/raw/master/.github/logo.png" alt="Project logo"></a>
</p>

<h3 align="center">GymPoint</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Este aplicativo é um gerente de academia completo chamado GymPoint. <br> Neste desafio foram construídas algumas funcionalidades básicas para o gerente da academia e os alunos. O conceito era um aplicativo da web para controlar estudantes, registros, planos e pedidos de ajuda feitos pelos alunos. Depois que criamos um aplicativo móvel (apenas Android) para os alunos fazerem check-in na academia e publicar pedidos de ajuda na academia 
    <br> 
</p>

## 📝 Table of Contents

- [Sobre](#about)
- [Primeiros passos] (# getting_started)
- [Uso] (# uso)
- [Construído usando] (# built_using)
- [Autores] (# autores)
- [TODO] (# todo)

## 🧐 About <a name = "about"></a>

Este projeto foi desenvolvido para ser um aplicativo de stack application , incluindo front-end, back-end e móvel, e será usado para a certificação Gostack 9 [Rocketseat] (https://github.com/rocketseat).

## 🏁 Primeiros passos <a name = "getting_started"></a>

Essas instruções fornecerão uma cópia do projeto em execução na sua máquina local para fins de desenvolvimento e teste.

### Pré-requisitos

O que você precisa para instalar o software e como instalá-lo.

- [Docker](https://www.docker.com/) - Container Platform
- [Yarn](https://yarnpkg.com/lang/en/) - Package Manager

### Instalando

Uma série de exemplos passo a passo que mostram como obter um ambiente de desenvolvimento em execução.

### Cloning Repo

```
$ git clone https://github.com/lucas3g/GymPoint.git
```

### Containers

Antes de tudo, você precisa criar os contêineres (Postgres e redis), depois de instalar o docker, execute o seguinte comando no seu terminal

**IMPORTANTE! Substituir ???? por uma porta disponível **

```
$ docker run --name gympointdb -e POSTGRES_PASSWORD=docker -p ????:5432 -d postgres:11
To create the container for Postgres DB

E depois

$ docker run --name redisgympoint -p ????:6379 -d -t redis:alpine
To create the container to Redis

```

### Database

Antes de executar o back-end, você precisará criar o banco de dados postgres em nosso container. Para isso, recomendo que você use o [Postbird] (https://github.com/Paxa/postbird). Em seguida, conecte-se às suas informações (container do Postgres) e crie o banco de dados com o nome ** 'gympointdb' ** antes de avançar para a próxima etapa.

### Backend

Após criar e executar todos os contêineres, crie o banco de dados do postgres, e você estará pronto para inicializar o back-end.

Dentro da pasta back-end, execute os comandos abaixo.

```
$ yarn
Para instalar todas as dependências

$ yarn sequelize db:migrate
Para executar todas as migrações para o banco de dados

$ yarn sequelize db:seed:all
Para propagar banco de dados com dados falsos
```


**ATENÇÃO! Antes de iniciar o modo de desenvolvimento do back-end, você precisará editar o exemplo .env nas suas informações e renomear o arquivo para .env **

Após isso, você só precisa executar o comando abaixo

```
$ yarn dev
Isso iniciará o back-end no modo dev

$ yarn queue
Isso iniciará a fila de tarefas do redis
```

### Frontend (Web)

Depois de executar o back-end.

```
$ yarn
Para instalar todas as dependências


$ yarn start
Para executar o aplicativo
```

### Mobile (:android: Android Only)

Após executar o back-end, dentro da pasta mobile, execute os comandos abaixo

```
$ yarn
Para instalar todas as dependências

$ yarn android
Para executar o aplicativo
```

## 🎈 Uso<a name="usage"></a>

### Web

Ao executar o aplicativo, você entrará com as informações de login abaixo

```
Login: admin@gympoint.com
Password: 123456
```

### Mobile

Você só precisará de um ID de um aluno com um registro ativo.
Na Página de Pedidos de Ajuda, você precisa usar "Puxar para atualizar" para verificar se há alguma atualização nos seus pedidos de ajuda.

## ⛏️ Construído usando <a name = "built_using"></a>

- [Docker](https://www.docker.com/) - Container Management
- [Redis](https://redis.io/) - Database
- [Postgres](https://www.postgressql.org/) - Database
- [Sequelize](https://sequelize.org/) - Node.js ORM
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Express](https://expressjs.com/) - Server Framework
- [ReactJs](https://reactjs.org/) - Web Framework
- [React Native](https://react-native.org/) - Mobile Framework
- [Styled Components](https://www.styled-components.com/) - CSS in Javascript library
- and others

## ✍️ Autores <a name = "authors"></a>

- [@rockeseat](https://rocketseat.com.br/bootcamp) - Idea & Initial template
- [@lucas3g](https://github.com/lucas3g) - Back-end, Front-end and Mobile App development

## TODO <a name="todo"></a>

- Recursos adicionais para web e dispositivos móveis