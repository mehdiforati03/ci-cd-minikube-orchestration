# 1. On part d'une image légère de Node.js
FROM node:18-alpine

# 2. On définit le dossier de travail dans l'image
WORKDIR /app

# 3. On copie les fichiers de dépendances (package.json)
COPY package*.json ./

# 4. On installe les bibliothèques nécessaires
RUN npm install

# 5. On copie tout le reste du code du dossier Backend
COPY . .

# 6. On expose le port que ton serveur utilise (souvent 5000)
EXPOSE 5000

# 7. La commande pour lancer ton application
CMD ["node", "server.js"]