# Use uma imagem base do Node.js
FROM node:20

# Defina o diretório de trabalho
WORKDIR /home/node/app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o arquivo tsconfig.json
COPY tsconfig.json ./

# Copie o restante dos arquivos do projeto
COPY . .

# Gere o cliente Prisma
RUN npx prisma generate

# Compile o código TypeScript para JavaScript
RUN npm run build

# Exponha a porta 4000 para o contêiner
EXPOSE 4000

# Comando padrão para iniciar o aplicativo
CMD [ "node", "dist/main.js" ]
