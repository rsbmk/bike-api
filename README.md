# API de Rentas de Bicicletas

## Tabla de contenidos
* [Sobre el proyecto](#Sobre-el-proyecto)
* [Características destacadas](#Características-destacadas)
* [Instalación](#Instalación)

## Sobre el proyecto

Bienvenido a la API de Rentas de Bicicletas! Esta aplicación, desarrollada en Deno y desplegada en Deno Deploy, representa un proyecto que combina lo mejor de la arquitectura hexagonal DDD y los principios SOLID. Enfocándonos en la creación de una solución robusta y versátil, hemos construido una API completa para administrar rentas de bicicletas.

## Características destacadas:

- **CRUD para bicicletas:** Puedes crear, leer, actualizar y eliminar bicicletas en nuestro sistema con facilidad.
- **CRUD para usuarios:** La gestión de usuarios es esencial, y nuestra API permite realizar todas las operaciones necesarias de manera sencilla.
- **Tareas programadas (Cron Jobs):** Hemos implementado un Cron Job que verifica periódicamente, cada 30 segundos, qué bicicletas ya están disponibles para su renta. Esta funcionalidad garantiza una experiencia fluida para los usuarios, ya que siempre tendrán acceso a bicicletas disponibles.

Este proyecto no solo representa un hito en nuestro viaje de aprendizaje autodidacta, sino que también demuestra nuestras habilidades en el desarrollo de aplicaciones web modernas. Si eres un reclutador o simplemente estás interesado en nuestra experiencia, ¡te invitamos a explorar este repositorio y descubrir más sobre nuestro trabajo.

## Instalación

Es importante recodar que el proyecto esta hecho con [Deno](https://deno.com/). Asi que antes debes tener instalado Deno en tu computadora.
Aqui puedes encontrar la [documentacion](https://docs.deno.com/runtime/manual/getting_started/installation) para instalar Deno.

1. Clonar el repositorio
```bash
     # Clonar el repositorio
    $ git clone git@github.com:rsbmk/bike-api.git

    # Entrar en el directorio
    $ cd bike-api
```

2. Correr el servidor
```bash
    # Correr el servidor en modo desarrollo
    $ deno run -A https://deno.land/x/denon/denon.ts run -A main.ts 
```