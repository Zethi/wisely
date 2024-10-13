# Backend prueba técnica Wisely

Este es un proyecto backend desarrollado en **TypeScript** usando **Express**. Este repositorio incluye la configuración para ejecutar el entorno de desarrollo y producción, así como la compilación de TypeScript a JavaScript.

## Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu sistema:

- [Node.js](https://nodejs.org/) v16 o superior
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

## Instalación

Sigue estos pasos para configurar el proyecto en tu entorno local:

1. Clona este repositorio:
    ```bash
    git clone https://github.com/
    ```

2. Instala las dependencias:
    ```bash
    npm install
    ```
3. Copia el archvio de `.env.example` a `.env` y modifica los valores de la base de datos.
    ```bash
    cp .env.example .env
    ```

## Scripts disponibles


### `npm run build`

Compila el proyecto de TypeScript a JavaScript, generando el código en la carpeta `/dist`. Este comando es esencial para preparar la aplicación para producción.

### `npm run start:dev`

Inicia el servidor en modo desarrollo utilizando **ts-node** para ejecutar los archivos TypeScript directamente. El servidor se ejecutará desde el archivo `src/app.ts`.

### `npm run start:production`

Inicia la aplicación en modo producción. Para ejecutar este comando, es necesario que el proyecto haya sido previamente compilado con `npm run build`. El servidor se iniciará ejecutando los archivos desde la carpeta `/dist`.