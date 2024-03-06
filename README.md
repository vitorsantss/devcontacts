# DevContacts

DevContacts é um projeto CRUD para gerenciar contatos desenvolvido com Node.js, Prisma, Vite React, Shadcn UI e Tailwind CSS.

## Instalação

Para começar, você precisará clonar este repositório em sua máquina local. Abra o terminal e execute o seguinte comando:

```bash
git clone https://github.com/seu-usuario/devcontacts.git
```

### Back-End

1. Navegue até o diretório do backend:

```bash
cd devcontacts/backend
```

2. Instale as dependências do Node.js:

```bash
npm install
```

3. Execute o Prisma Migrate para aplicar migrações ao banco de dados:

```bash
npx prisma migrate dev

3. Adicione uma secret key ao arquivo `.env`:

```plaintext
SECRET_KEY=SuaSecretKeyAqui
```


Isso criará ou atualizará o esquema do banco de dados de acordo com as definições em `schema.prisma`.

5. Inicie o servidor Node.js:

```bash
npm run dev
```


### Front-End

1. Navegue até o diretório do frontend:

```bash
cd devcontacts/frontend
```

2. Instale as dependências do Node.js:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

## Uso

Após seguir as instruções acima, você poderá acessar a aplicação DevContacts em seu navegador. Esta aplicação permite que você crie, leia, atualize e exclua contatos.


