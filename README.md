# Wisely

Este proyecto, **Wisely**, incluye un backend en Node.js que utiliza Sequelize para interactuar con una base de datos MySQL, y un frontend desarrollado en Vue.js.

## Requisitos

- **Docker**: Asegúrate de tener Docker instalado en tu máquina.
- **Docker Compose**: También necesitarás Docker Compose para gestionar los contenedores.

## Pasos de instalación

1. **Construir y levantar los servicios**:

   Abre una terminal en la raíz del proyecto y ejecuta:

   ```bash
   docker compose up --build
   ```

2. **Rellenar las tablas con datos de prueba**:

   Luego, usa el siguiente comando para sembrar la base de datos:

   ```bash
   docker exec -it wisely_backend npx sequelize-cli db:seed:all
   ```

## Acceso a los Servicios

- **Backend**: Disponible en `http://localhost:3000`
- **Frontend**: Disponible en `http://localhost:4000`