# Etapa de construcción:
FROM node:18.17.1 as build

# Establecer el directorio de trabajo dentro del contenedor:
WORKDIR /app

# Copiamos el package.json y el package-lock.json al directorio de trabajo:
COPY package*.json ./

# Instalamos todas las dependencias del proyecto, incluyendo las de desarrollo:
RUN npm install

# Copiamos todo el código fuente al directorio de trabajo:
COPY . .

# Construimos la aplicación:
RUN npm run build

# Etapa de producción:
FROM node:18.17.1

# Establecer el directorio de trabajo dentro del contenedor:
WORKDIR /app

# Copiamos el package.json y el package-lock.json al directorio de trabajo:
COPY package*.json ./

# Instalamos solo las dependencias de producción:
RUN npm install --only=production

# Copiamos los archivos compilados desde la etapa de construcción:
COPY --from=build /app/build ./build

# Especificar el comando para iniciar la aplicación en producción:
CMD ["npm", "run", "start"]