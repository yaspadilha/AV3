# ✈️ AV3 — Sistema aerocode

Projeto desenvolvido para a disciplina de _Programação Orientada à objetos (POO)_

## 📌 Objetivo

Desenvolver uma aplicação web completa (Fullstack) para gestão de produção de aeronaves. Garantir que o sistema possua controle de acesso baseado em cargos.

---

## 🛠️ Tecnologias Utilizadas

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-3178C6?style=for-the-badge&logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)

---

## 🚀 Como Executar

### Backend

1. Abra o terminal e entre na pasta backend:  
   ```bash
   cd backend

2. Instale as dependências:
   ```bash
   npm install

3. Crie um banco de dados no MySQL:  
   ```bash
   CREATE DATABASE aerocode

4. Crie o arquivo .env e configure com as credenciais do seu banco:  
   ```bash
   DATABASE_URL="mysql://USUARIO:SENHA@HOST:PORT/aerocode_db"

5. Crie as tabelas no banco:  
   ```bash
   npx prisma migrate dev --name init

6. Crie os usuários padrão:  
   ```bash
   npx prisma db seed

7. Inicie o servidor:  
   ```bash
   npm start
   O servidor rodará em: http://localhost:3000

### Frontend

1. Abra outro terminal e entre na pasta frontend:  
   ```bash
   cd frontend

2. Instale as dependências:  
   ```bash
   npm install

4. Inicie a aplicação:  
   ```bash
   npm run dev