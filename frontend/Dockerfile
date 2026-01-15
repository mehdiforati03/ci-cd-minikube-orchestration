FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
# On installe 'serve' ici pour qu'il soit sauvegardé dans l'image
RUN npm install -g serve 
COPY . .
RUN npm run build
# On utilise la version installée globalement
CMD ["serve", "-s", "build", "-l", "3000"]