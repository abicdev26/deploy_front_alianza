# Prueba Tecnica Grupo Alianza

Proyecto Vue.js para gestionar y visualizar datos de una API externa (en este caso, https://www.thecocktaildb.com/api.php) mediante un sistema de inicio de sesión y registro de usuarios. Este proyecto brinda acceso a los usuarios para explorar y examinar los datos proporcionados por la API externa

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Despliegue](#despliegue)
- [Contribución](#Contribución)
- [Tecnologias](#Tecnologias)
- [Créditos](#créditos)
- [Licencia](#licencia)
- [Contacto](#contacto)

## Instalación

Sigue estos pasos para instalar y ejecutar la aplicación:

1. Clonar el proyecto 
```sh
git clone https://github.com/Abic26/front_prueba_tec_alianza.git
```
2. Seleccione donde descargo el proyecto:
```sh
cd ejemplo/ejemplo
```
3. Instala las dependencias:
```sh
npm install
```
4. Abrir el proyecto en el editor de código de preferencia, se recomienda Vsc (Visual Studio Code):
```sh
code .
```
5. inicializa el proyecto en local
```sh
npm run dev
```
## Uso

1. Al inicializar el proyecto en local ingresaras a la pagina principal, te diriges al login para inisiar seseion o para crear el perfil.

2. Luego ingresaras al login para validar tus credenciales e ingresar a la componente "drinks".

3. Agrega bebidas al carrito de compras

4. Al finalizar la seleccion de agregar bebidas, dar click en order para visualizar los productos seleccionados.

5. Despues le damos click en "add order" para agregar tu pedido, esto se enviara a a base de datos y queda registrado como "Orders Delivered", donde podras visualizar las ordenes anteriores ya entregadas.

### Filtrar

En la seccion de "drinks" tienes un filtro para que se pueda realziar una busqueda en la api de bebidas 

### Eliminar

En la seccion de "orders" podras eliminar las bebidas que no deseas ordenar

## Contribución

Cómo contribuir al proyecto.
1. Clonar el proyecto:
```sh
git clone https://github.com/Abic26/front_prueba_tec_alianza.git
```
2. Crea una rama para la contribución: 
```sh
git checkout -b feature/nueva-funcionalidad
```
3. Realice sus cambios y realiza los commits: 
```sh
git add .
git commit -m "Agrega nueva funcionalidad"
```
4. Realize push con sus nuevos cambios: 
```sh
git push origin feature/nueva-funcionalidad
```

## Tecnologias

- Para este proyecto se utilzo vue.js para el frontend, con el uso de tailwind para los estilos, primevue para componentes, alertas, botones, inputs, iconos, etc, para la logica se utilizo jquery y javascript, para las peticiones a la api se hizo con ajasx y axios.

## Créditos

Este proyecto fue creado por [Andres Felipe Lopez S. "Abic26"](https://github.com/Abic26).

## Licencia

Este proyecto está bajo la Licencia MIT, lo que significa que puedes:

- Usar el código en tus proyectos personales o comerciales.
- Modificar el código para satisfacer tus necesidades.
- Distribuir el código modificado o sin modificar.
- Incluir el código en otros proyectos (con los atributos adecuados).

**¡No tienes que pedir permiso!** Solo asegúrate de incluir el aviso de derechos de autor y la declaración de la Licencia MIT en las copias de tu proyecto.

## Contacto

Si tienes preguntas, sugerencias o comentarios sobre este proyecto, no dudes en ponerte en contacto. Puedes visitarme a través de:

- Correo electrónico: [abicsupa@gmail.com](mailto:abicsupa@gmail.com)
- Sitio web: [Abic26_page](https://abicdev.vercel.app/)

¡Espero escuchar tus pensamientos y opiniones!

