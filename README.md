# User Management System

Este é um sistema full-stack para gerenciamento de usuários, desenvolvido com Next.js, React, MongoDB e Prisma. O aplicativo permite o registro, autenticação e visualização do perfil do usuário de forma segura e eficiente.

## 🚀 Tecnologias Utilizadas

- **Next.js** - Framework para React, permitindo renderização no lado do servidor (SSR) e geração estática.
- **React** - Biblioteca para criação de interfaces dinâmicas e responsivas.
- **MongoDB** - Banco de dados NoSQL para armazenamento flexível e escalável dos dados.
- **Prisma** - ORM para interação eficiente com o banco de dados.
- **JWT (JSON Web Token)** - Implementado para garantir autenticação segura.

## 📌 Funcionalidades

- Registro de usuários.
- Autenticação segura via JWT.
- Visualização e edição de perfil do usuário.
- Interface responsiva e moderna.

## 📦 Como Executar o Projeto

### 1. Clone o repositório
```sh
 git clone https://github.com/seu-usuario/seu-repositorio.git
 cd seu-repositorio
```

### 2. Instale as dependências
```sh
npm install
# ou
yarn install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:
```env
DATABASE_URL=mongodb+srv://seu_usuario:senha@cluster.mongodb.net/seu_banco
JWT_SECRET=sua_chave_secreta
```

### 4. Rode as migrações do Prisma
```sh
npx prisma migrate dev
```

### 5. Inicie o servidor
```sh
npm run dev
# ou
yarn dev
```
O servidor estará rodando em `http://localhost:3000`.

## 🛠 Estrutura do Projeto

```
/project-root
├── prisma/         # Configuração do Prisma e esquemas do banco de dados
├── pages/          # Páginas do Next.js
├── components/     # Componentes reutilizáveis do React
├── services/       # Serviços para autenticação e interação com API
├── styles/        # Arquivos de estilos
├── .env           # Arquivo de variáveis de ambiente
└── README.md
```

## 🤝 Contribuição
Sinta-se à vontade para contribuir! Faça um fork do repositório, crie uma branch e envie um PR.

## 📄 Licença
Este projeto está sob a licença MIT. Para mais detalhes, consulte o arquivo `LICENSE`.

---
Desenvolvido por **Andreo Henrique** 🚀

